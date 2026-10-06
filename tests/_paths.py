"""Gemeinsame Ausgabepfade der E2E-Suiten: Screenshots und Berichte nach ~/Documents/Hermes-Berichte/Homepage-Tests
(Finder-freundlich, nie /tmp). Import in den Suiten: `from _paths import REPORTS, shots`."""
import pathlib

REPORTS = pathlib.Path.home() / "Documents/Hermes-Berichte/Homepage-Tests"


def shots(name):
    """Ordner für die Screenshots einer Suite (wird bei Bedarf angelegt)."""
    folder = REPORTS / name
    folder.mkdir(parents=True, exist_ok=True)
    return folder
