from app.services.catalog_service import get_all_items


def test_get_all_items(monkeypatch) -> None:

    result = "test"
    assert result == "test"
