import importlib.util
import unittest
from pathlib import Path


SCRIPT = Path(__file__).parents[1] / "scripts" / "generate-portfolio-performance.py"
SPEC = importlib.util.spec_from_file_location("portfolio_performance", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
SPEC.loader.exec_module(MODULE)


def row(action, time, ticker="", shares="", price="", total=""):
    return {
        "Action": action,
        "Time": time,
        "Ticker": ticker,
        "No. of shares": shares,
        "Price / share": price,
        "Total": total,
    }


class ReplayTransactionsTests(unittest.TestCase):
    def test_replays_cash_positions_income_and_partial_sale(self):
        rows = [
            row("Deposit", "2026-01-01 09:00:00", total="100"),
            row("Market buy", "2026-01-02 09:00:00", "TEST", "2", "20", "40"),
            row("Dividend (Dividend)", "2026-01-03 09:00:00", "TEST", total="1"),
            row("Market sell", "2026-01-04 09:00:00", "TEST", "1", "25", "25"),
            row("Interest on cash", "2026-01-05 09:00:00", total="0.5"),
        ]

        positions, cash, executions, events = MODULE.replay_transactions(rows)

        self.assertAlmostEqual(positions["TEST"], 1)
        self.assertAlmostEqual(cash, 86.5)
        self.assertAlmostEqual(executions["TEST"], 20)
        self.assertEqual(len(events), 5)

    def test_replay_is_time_order_independent(self):
        rows = [
            row("Market sell", "2026-01-03 09:00:00", "TEST", "1", "25", "25"),
            row("Deposit", "2026-01-01 09:00:00", total="100"),
            row("Market buy", "2026-01-02 09:00:00", "TEST", "2", "20", "40"),
        ]

        positions, cash, _, _ = MODULE.replay_transactions(rows)

        self.assertAlmostEqual(positions["TEST"], 1)
        self.assertAlmostEqual(cash, 85)


if __name__ == "__main__":
    unittest.main()
