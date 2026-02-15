---
title: "Terraform and IaC: Practical Guide for Tech Teams"
date: "2025-11-07"
tags: ["Software Engineering", "Infrastructure as Code", "Terraform", "DevOps", "Platform Engineering", "Cloud Security", "AWS", "GitOps"]
excerpt: "Why IaC matters, how to run Terraform at team scale, and a step-by-step EC2 example to get started."
seo_title: "Terraform and Infrastructure as Code: Practical Team Guide"
meta_description: "Get started with Terraform and IaC. Covers why infrastructure as code matters, team-scale workflows, state management, and a step-by-step AWS EC2 example."
target_keywords: "Terraform tutorial, infrastructure as code, Terraform AWS example, IaC best practices, Terraform team workflow"
faqs:
  - q: "What is Infrastructure as Code and why does it matter?"
    a: "Infrastructure as Code (IaC) defines your cloud infrastructure in text files instead of manual console clicks. It lets you preview changes before applying them, track who changed what via git history, recreate entire environments from scratch, and revert broken changes by reverting a commit."
  - q: "How does Terraform work?"
    a: "Terraform models infrastructure as a dependency graph using HCL (HashiCorp Configuration Language). You describe the desired state of your resources, run 'terraform plan' to see exactly what will change, and run 'terraform apply' to execute. It works with AWS, GCP, Azure, and thousands of other providers."
  - q: "What are Terraform best practices for team workflows?"
    a: "Use remote state with locking (S3 + DynamoDB for AWS), keep stacks small and focused, write reusable modules for repeated patterns, review infrastructure changes via pull requests with plan output included, run Terraform in CI, pin provider versions, and never commit secrets to your repo."
  - q: "How do you manage Terraform state safely?"
    a: "Use remote state storage (like S3) with locking (like DynamoDB) to prevent concurrent modifications. Encrypt state files since they contain secrets, restrict access, and maintain separate state files per environment (dev, staging, prod). Never use local state files in a team setting."
  - q: "What common Terraform mistakes should I avoid?"
    a: "Avoid letting people make manual console changes that drift from your Terraform code, putting all resources in one massive state file, using overly clever loops that become unreadable, not pinning provider versions (which can cause unexpected resource recreation), and giving Terraform overly broad IAM permissions."
---
# Terraform and IaC: The Operating System of Your Cloud

Infrastructure as Code turns cloud topology into text files. That changes everything about how you ship and scale systems.

I spent my first two years in cloud clicking through consoles. Then a teammate deleted our staging database by accident—thought she was in dev. We had no way to recreate the exact setup. Took us six hours to rebuild from memory and screenshots. That week I learned Terraform.

Later, I joined an organization and then found out the existing Lead Engineer had a foot halfway out the door. I quickly had to learn the entire infrastructure and document it for an upcoming audit. It's a lot easier to do this when the infrastructure is defined in a shared, readable language vs. having to click around different dashboards, screens and environment-specific configs.

Terraform models infrastructure as a dependency graph and shows you a plan before changing anything. It works with AWS, GCP, Azure, and about 3,000 other providers. Once you get past the initial learning curve (which is steep), it becomes how you think about cloud infrastructure.

## Why IaC Matters


You can recreate entire environments from scratch. Someone submits a pull request to add a load balancer, you review the diff like code, merge it, and Terraform applies the change. If something breaks, you revert the commit.

Before IaC, our production and staging environments diverged constantly. Someone would tweak a security group in prod to fix an urgent issue, forget to document it, and three months later staging would mysteriously behave differently. Tracking down those differences was brutal.

With everything in code:
- You preview exactly what will change before it happens
- You know who changed what and why (git blame works for infrastructure)
- You can recreate an environment in a different region in 20 minutes
- Your brain stops keeping track of all the manual steps

Still requires discipline. People will absolutely still click around in the console if you let them.

## Why Terraform

I tried CloudFormation first. It works fine if you only use AWS, but the YAML gets unwieldy fast and the error messages are cryptic. Pulumi is interesting—real programming languages instead of HCL—but our team wasn't ready to write infrastructure in TypeScript.

Terraform won for us because:
- You describe what you want, not the steps to get there
- The plan command shows you exactly what will change before you commit to it
- Same workflow whether you're provisioning AWS, GitHub repos, or Datadog monitors
- You can package reusable modules and share them across teams

The HCL syntax takes getting used to. I still look up the for_each syntax every time. But the plan/apply workflow catches so many mistakes that it's worth the learning curve.

## What Actually Works at Scale

**Use remote state with locking.** We started with local state files and someone overwrote production state from their laptop. Not fun. S3 + DynamoDB for state and locking solved that. Encrypt it and restrict who can read it—state files contain secrets.

Keep stacks small. Our first Terraform repo was one giant file that managed the entire AWS account. Every change risked breaking something unrelated and plan took 3 minutes. We split it into networking, databases, apps, and monitoring. Much faster, clearer ownership.

**Write modules for repeated patterns.** If you're creating the same resources with slight variations, make a module. Document the inputs and outputs. Version it. We have modules for web services, cron jobs, and databases that teams can use without reinventing security groups.

Review infrastructure changes like code. One PR per change. Require someone else to review. Paste the plan output into the PR description. Saved us multiple times from accidentally deleting things.

Run Terraform in CI. Format check, validation, and plan on every PR. We auto-approve formatting fixes but require human approval for resource changes. Catches typos before they hit AWS.

Don't commit secrets. Ever.

Use AWS Secrets Manager or similar. Learned this the hard way when an API key ended up in git history. Had to rotate everything and rewrite history.

**Separate state per environment.** One state file for dev, one for staging, one for prod. Never mix them. Workspaces seem convenient but make it too easy to accidentally run apply against the wrong environment.

## Mistakes I've Made (So You Don't Have To)

**Letting people click in the console.** Someone "temporarily" modified a security group in production to fix an issue. Forgot to update Terraform. Next deploy reverted their fix and broke the app. Now Terraform owns the resource or we don't manage it at all.

One massive Terraform stack. Our first attempt put networking, databases, and applications in one state file. Every tiny change required planning 200+ resources. Took forever and meant higher risk. Splitting into focused stacks (one for VPC, one for RDS, one per application) made deploys faster and safer.

I also spent two days getting fancy with loops and conditionals, trying to dynamically generate resources with count and locals. The code was clever but impossible to understand three months later. Explicit resources are boring but readable.

**Not pinning provider versions.** Updated Terraform, it pulled a new AWS provider, and suddenly the plan wanted to recreate our production database because of a schema change. Always pin versions with ~> 4.0 or similar.

Too-broad IAM permissions. Gave Terraform admin access initially because it was easier. Bad idea. Someone accidentally ran apply against the wrong state file and had permissions to delete everything. Narrow the permissions. Make it possible but annoying to do destructive things.

## Step-by-Step: Launch an Amazon EC2 Instance with Terraform

Here's a minimal example to get started. It uses a dynamic AMI lookup so you're not stuck with outdated AMI IDs, and restricts SSH to your IP address instead of opening it to the world.

You'll need:
- An AWS account with credentials configured (aws configure)
- An EC2 key pair already created (check the AWS console under EC2 → Key Pairs)
- Terraform installed (brew install terraform on Mac)

### 1) Create a working directory

- mkdir ec2-example && cd ec2-example

### 2) Create main.tf

```hcl
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = var.region
}

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_security_group" "ssh" {
  name        = "iac-ssh"
  description = "Allow SSH from your IP"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.my_ip_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "iac-ssh" }
}

resource "aws_instance" "example" {
  ami                         = data.aws_ami.amazon_linux.id
  instance_type               = var.instance_type
  key_name                    = var.key_name
  vpc_security_group_ids      = [aws_security_group.ssh.id]
  associate_public_ip_address = true

  tags = { Name = "iac-ec2-example" }
}

output "public_ip"  { value = aws_instance.example.public_ip }
output "public_dns" { value = aws_instance.example.public_dns }
```

### 3) Create variables.tf

```hcl
variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "key_name" {
  description = "Name of an existing EC2 key pair"
  type        = string
}

variable "my_ip_cidr" {
  description = "Your public IP in CIDR notation, e.g., 203.0.113.4/32"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}
```

### 4) Create terraform.tfvars

```hcl
key_name   = "your-keypair-name"
my_ip_cidr = "203.0.113.4/32" # replace with your IP
```

### 5) Initialize, plan, and apply

```bash
terraform init      # Downloads the AWS provider
terraform validate  # Checks syntax
terraform plan      # Shows what will change
terraform apply     # Makes the changes (asks for confirmation)
```

The plan output shows you exactly what Terraform will create. Type "yes" when it asks for approval. Takes about 30 seconds to spin up the instance.

Once it finishes, grab the public_ip from the output and SSH in:
```bash
ssh -i /path/to/your-key.pem ec2-user@<public_ip>
```

First time I did this, I forgot to update my_ip_cidr and couldn't connect. Make sure that's actually your public IP.

### 6) Clean up

```bash
terraform destroy
```

This deletes everything Terraform created. Important—AWS will charge you for running instances even if you're not using them. I once left a test instance running for two months by accident. That was a $60 lesson.

## If You're Setting This Up for a Team

You need to standardize a few things upfront or every team will solve the same problems differently.

**Build reference modules.** VPC setup, standard security groups, logging configuration, required tags. Package them as modules so teams don't start from scratch. Document the inputs and include examples.

Centralize state management. Pick one S3 bucket and DynamoDB table for state. Set up access controls. Back it up. Don't let teams use local state files.

**Establish a change process.** We require PRs for all infrastructure changes, plus paste the plan output in the PR description. Auto-merge formatting changes but require approval for resource modifications. We have a weekly infrastructure deploy window for non-urgent changes.

Add policy guardrails with something like Conftest or Terraform Sentinel to enforce rules—no public S3 buckets, all resources must have owner tags, databases must have backups enabled. Catches mistakes automatically.

And help people learn. Short examples, office hours once a week, a Slack channel for questions. Track adoption by measuring how many resources are managed by Terraform vs created manually. You'll never hit 100%, but you can get close.

## Just Start

Pick one thing. One EC2 instance, one S3 bucket, one security group. Put it in Terraform. Get remote state working. Make a change via pull request. See how it feels.

Then add another thing. Eventually you'll have enough coverage that manual changes feel weird and risky. That's when you know it's working.

The EC2 example above is real code you can run today. Wire it into GitHub Actions or GitLab CI. Submit your first infrastructure PR. You'll make mistakes—I destroyed a test database my first week by running apply in the wrong directory—but that's how you learn.

Stop clicking in the AWS console. Your future self will thank you.