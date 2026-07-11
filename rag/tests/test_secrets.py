from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def test_frontend_contains_no_backend_secret_names():
    frontend = "\n".join(path.read_text(errors="ignore") for path in (ROOT / "src").rglob("*") if path.is_file())
    for forbidden in ("SUPABASE_SERVICE_ROLE_KEY", "OPENAI_API_KEY", "ANTHROPIC_API_KEY"):
        assert forbidden not in frontend


def test_example_env_has_no_values():
    for line in (ROOT / "rag" / ".env.example").read_text().splitlines():
        if line.startswith(("OPENAI_API_KEY=", "ANTHROPIC_API_KEY=", "SUPABASE_SERVICE_ROLE_KEY=")):
            assert line.endswith("=")
