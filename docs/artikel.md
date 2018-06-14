
# Artikel

Unsere Referenzdaten enthalten neben technischen Kenndaten auch anwendungsbezogene Informationen wie
Applikationsweg oder Anwendungsgebiet, welche durch Ärzte und Apotheker manuell hinzugefügt werden.

Die Grundstruktur der Referenzdaten ist in der [Einleitung](/README.md) aufgeführt.

## Graph Form
Ein Artikel kann in unterschiedliche Formen (form), wie z.B. Tablette, Lösungen, u.v.m, hergestellt worden sein. Jede Form kann zudem auf unterschiedliche Weise (applw) appliziert werden. Dabei sind die Einheiten (unit,type) abhängig von Form und Applikationsweg. Der folgende Bubble Chart visualisiert diese Beziehung. Wenn man auf eine Bubble klickt, werden die jeweilgen Einheiten angezeigt.

[Bubble Chart](form-bubble.html ':include :type=iframe width=100% height=750px')

## Graph Inhaber
In der Schweiz gibt es pharmazeutische Artikel von grossen und kleinen Herstellern. Das Sortiment von Hersteller mit mehr als 40 Brands und mit jeweils mehr als 10 Artikel innerhalb dieses Brands werden in folgendem Graph visualiert.

[Tree Inhaber](inhaber-tree.html ':include :type=iframe width=100% height=1460px')

<style>

  @media screen and (min-width: 1300px) {

    main article.markdown-section p iframe {
      margin-left: -50px;
      margin-right: -50px;
      width: calc( 1200px - 335px );
      border: 1px solid rgb(27, 119, 181);
    }

  }

</style>
