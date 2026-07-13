from __future__ import annotations

import time
from collections import deque
from threading import Lock
from typing import Callable

import httpx


class ProcessBurstGuard:
    """Process-local burst defense; deployment-wide cost limits live in Supabase."""

    def __init__(
        self,
        per_minute: int,
        clock: Callable[[], float] = time.monotonic,
    ) -> None:
        self.per_minute = per_minute
        self.clock = clock
        self._minute: deque[float] = deque()
        self._lock = Lock()

    def allow(self) -> bool:
        now = self.clock()
        with self._lock:
            while self._minute and self._minute[0] <= now - 60:
                self._minute.popleft()
            if len(self._minute) >= self.per_minute:
                return False
            self._minute.append(now)
            return True


def consume_deployment_budget(supabase_url: str, service_key: str, request_limit: int) -> bool:
    """Atomically consume one request from the shared fixed-hour budget."""
    response = httpx.post(
        f"{supabase_url.rstrip('/')}/rest/v1/rpc/consume_blog_request_budget",
        headers={"apikey": service_key, "Authorization": f"Bearer {service_key}"},
        json={"request_limit": request_limit},
        timeout=10,
    )
    response.raise_for_status()
    return response.json() is True
