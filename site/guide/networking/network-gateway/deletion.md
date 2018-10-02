# Usunięcie Bramy sieciowej

## Wprowadzenie

Dokument wyjaśnia w jaki sposób usunąć [Bramę sieciową](/resource/networking/network-gateway.md).

## Warunki wstępne

Operacja może zostać wykonana po spełnieniu następujących warunków:

* wszystkie [warunki usuwania Bramy sieciowej](/resource/networking/network-gateway.md#usuwanie)

## Instrukcja

### Panel

W celu wykonania operacji z wykorzystaniem panelu wykonaj następujące kroki:

```guide
[
  {
    "action_name": "click",
    "data": {
      "type": "entry",
      "location": "sidebar",
      "selector": ".nav > li:nth-child(2)",
      "label": "Bramy sieciowe"
    }
  },
  {
    "action_name": "click",
    "data": {
      "type": "entry_resource",
      "selector": "navbar>.vm"
    },
    "after_event": "Po kliknięciu pojawi się strona ze szczegółami zasobu."
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
      "type": "button",
      "selector": "navbar>.vm",
      "label": "Usuń"
    },
    "after_event": "Po kliknięciu pojawi się okno potwierdzenia operacji."
  },
  {
    "action_name": "click",
    "data": {
      "type": "button",
      "selector": "navbar>.vm",
      "label": "Usuń"
    }
  }
]
```

#### CLI

W celu wykonania operacji z wykorzystaniem CLI wykonaj następujące polecenie:

```bash
h1 dns zone delete --zone example.com.
```

gdzie:

 * ```--zone``` określa nazwę lub identyfikator *Sieci*

Szczegółowe dane są dostępne w dokumentacji polecenia [CLI="dns zone delete"].