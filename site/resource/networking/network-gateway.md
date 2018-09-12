# Brama sieciowa

## Przeznaczenie

*Brama sieciowa* zapewnia łączność z *Sieci* do Internetu.

## Utworzenie

*Brama sieciowa* może zostać utworzona, w przypadku spełnienia następujących warunków:

 * posiadanie w projekcie niewykorzystywanego adresu IP,
 * wszystkie *ogólne* warunki

Utworzenie *bramy sieciowej* wymaga wskazania *Adresu IP* wcześniej przydzielonego do projektu.

## Usuwanie

*Brama sieciowa* może zostać usunięta, w przypadku spełnienia następujących warunków:

 * nie jest przywiązany do żadnej *Sieci*
 * wszystkie *ogólne* warunki

## Zarządzanie

Dostępne są następujące dedykowane operacje:

* przyłączenie *Bramy sieciowej* do określonej *Sieci*
* rozłączenie *Bramy sieciowej* od określonej *Sieci*

### Przyłączenie

Operacja może zostać wykonana, w przypadku spełnienia następujących warunków: 

* zasób znajduje się w stanie ```Rozłączony```
* *Projekt* zawiera *Sieć*, która nie ma przyłączonej żadnej bramy domyślnej
* zasób nie znajduje się w stanie *Ograniczonego użycia*

### Rozłączenie

Operacja może zostać wykonana, w przypadku spełnienia następujących warunków: 

* znajduje się w stanie ```Przyłączony```
* nie znajduje się w stanie *Ograniczonego użycia*

## Lokalizacja

!!! include(regions.md) !!!

## Cennik

Nazwa           | Okres  | Cena (PLN) | Uwagi
--------------- | :----: | ---------: | :----:
Brama sieciowa  |   -    |     0.0000 | 

<!-- TODO: Service need to be created. -->

*Podane ceny są cenami netto i nie zawierają podatku VAT*

## Przewodniki

<PageList path_re="guide/networking/network-gateway/"/>

## Powiązane produkty

* *[Sieć](/resource/networking/network-gateway.md)*