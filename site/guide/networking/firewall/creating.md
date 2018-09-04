# Utworzenie zapory sieciowej

## Wprowadzenie

Dokument wyjaśnia w jaki sposób utworzyć *[Zaporę sieciową](/resource/networking/firewall.md)* wykorzystywaną do kontroli przepływu w *Sieci*.

## Warunki wstępne

* utworzenie *Zapory sieciowej* wymaga spełnienia [warunków utworzenia Zapory sieciowej](/resource/networking/firewall.md#utworzenie)

## Instrukcja

### Panel
      
W celu utworzenia *Zapora sieciowa* poprzez panel wykonaj następujące kroki:

```guide
[
  {
    "action_name": "click",
    "data": {
      "type": "entry",
      "location": "sidebar",
      "selector": ".nav > li:nth-child(2)",
      "label": "Sieci"
    }
  },
  {
    "action_name": "click",
    "data": {
      "type": "button",
      "selector": "navbar>.vm",
      "label": "Utwórz Nowy"
    },
    "after_event": "Po kliknięciu pojawi się okno z formularzem."
  },    
  {
    "action_name": "form",
    "data": {
      "modal": true,
      "steps": [
        {
          "name": "Nazwa",
          "type": "name",
          "value": "moj-firewall"
        }
      ],
      "defined_all": true
    }
  },
  {
    "action_name": "click",
    "data": {
      "type": "button",
      "selector": "navbar>.vm",
      "label": "Utwórz"
    },
    "after_event": "Po kliknięciu przejdziesz do strony ze szczegółami nowego zasobu."
  }
]
```

#### CLI

W celu utworzenia ISO z wykorzystaniem CLI wykonaj następujące polecenie:

```bash
h1 firewall create --name my-ip-network
```

gdzie:

 * ```--name``` - określa nazwę nowoutworzonego firewalla

Szczegółowe dane są dostępne w dokumentacji polecenia [CLI="firewall create"].