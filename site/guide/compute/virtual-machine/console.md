# Uzyskanie dostepu do graficznej konsoli Wirtualnej Maszyny

## Wprowadzenie

Dokument wyjaśnia w jaki sposób uzyskać dostepu do graficznej konsoli [Wirtualnej maszyny](/resource/compute/virtual-machine.md).

## Warunki wstępne

* wszystkie warunki wykonania operacji [Uzyskanie dostepu do graficznej konsoli](/resource/compute/virtual-machine.md#uruchomienie).

## Instrukcja

### Panel

W celu uzyskanie dostepu do graficznej konsoli *Wirtualnej maszyny* poprzez panel wykonaj następujące kroki:

```guide
[
  {
    "action_name": "click",
    "data": {
      "type": "entry",
      "location": "sidebar",
      "selector": ".nav > li:nth-child(2)",
      "label": "Wirtualne maszyny"
    }
  },
  {
    "action_name": "click",
    "data": {
      "type": "entry_resource",
      "selector": "navbar>.vm"
    },
    "after_event": "Po kliknięciu pojawią szczegóły zasobu."
  },
  {
    "action_name": "click",
    "data": {
      "type": "button",
      "selector": "navbar>.vm",
      "label": "Akcje"
    },
    "after_event": "Po kliknięciu pojawi się lista rozwijana."
  },
  {
    "action_name": "click",
    "data": {
      "type": "entry",
      "selector": "navbar>.vm",
      "label": "Konsola"
    }
  }
]
```

#### CLI

W celu uzyskanie dostepu do graficznej konsoli *Maszyny Wirtualnej* z wykorzystaniem CLI wykonaj następujące polecenie:

```bash
h1 vm console --vm test-vm
```

gdzie:

 * ```--vm``` określa nazwę lub identyfikator *Wirtualnej maszyny*

Szczegółowe dane są dostępne w dokumentacji polecenia [CLI="vm console"].