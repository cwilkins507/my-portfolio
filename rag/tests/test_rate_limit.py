from rag.rate_limit import ProcessBurstGuard, consume_deployment_budget


def test_process_burst_guard_enforces_limit_and_recovers():
    now = [100.0]
    guard = ProcessBurstGuard(per_minute=2, clock=lambda: now[0])

    assert guard.allow() is True
    assert guard.allow() is True
    assert guard.allow() is False
    now[0] += 61
    assert guard.allow() is True


def test_deployment_budget_uses_service_role_rpc(monkeypatch):
    calls = []

    class Response:
        def raise_for_status(self):
            return None

        def json(self):
            return True

    def post(url, **kwargs):
        calls.append((url, kwargs))
        return Response()

    monkeypatch.setattr("rag.rate_limit.httpx.post", post)

    assert consume_deployment_budget("https://project.supabase.co/", "secret", 500) is True
    assert calls == [(
        "https://project.supabase.co/rest/v1/rpc/consume_blog_request_budget",
        {
            "headers": {"apikey": "secret", "Authorization": "Bearer secret"},
            "json": {"request_limit": 500},
            "timeout": 10,
        },
    )]


def test_deployment_budget_reports_exhaustion(monkeypatch):
    class Response:
        def raise_for_status(self):
            return None

        def json(self):
            return False

    monkeypatch.setattr("rag.rate_limit.httpx.post", lambda *args, **kwargs: Response())
    assert consume_deployment_budget("https://project.supabase.co", "secret", 500) is False
