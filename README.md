# prog2
Programmeerimine II

Mario Murd

*NodeJS* *TypeScript* *Express*

API Endpoindid

*TEST*
    get /api/v1/health

*KASUTAJA*

    *kasutajate nimekiri*
        GET /api/v1/users

    *kasutaja loomine*
        POST /api/v1/users

    *kasutaja otsimine ID alusel*
        GET /api/v1/users/:id

    *kasutaja kustutamine*
        DELETE /api/v1/users/:id

    *kasutaja andmete muutmine*
        PATCH /api/v1/users/:id

*POSTITUSTE meeldivaks märkimine*
    
    *postituse otsimine ID alusel ning score++*
        POST /api/v1/posts/:id/like

    *postituse otsimine ID alusel ning mitte meeldivaks märkimine*
        POST /api/v1/posts/:id/dislike

*POSTITUS*

    *postituste nimekiri*
        GET /api/v1/posts

    *postituse otsimine ID alusel*
        GET /api/v1/posts/:id

    *postituse loomine*
        POST /api/v1/posts

    *postituse kustutamine*
        DELETE /api/v1/posts/:id

    *postituse muutmine*
        PATCH /api/v1/posts/:id

*KOMMENTAARID*

    *kõikide kommentaaride pärimine*
        GET /api/v1/comments

    *Kommentaar id alusel*
        GET /api/v1/comments/:id

    *Postitusega seotud kommentaaride pärimine*
        GET /api/v1/posts/:id/comments

    *kommentaari loomine*
        POST /api/v1/comments

    *Kommentaari kustutamine*
        DELETE /api/v1/comments/:id
