# wiki.js-wrapper
A wrapper for the Wiki.js API (GraphQL).

## Documentation

### Classes and Methods

**Client( { baseURL, token } )**
 - Params: Object { baseURL:STRING, token:STRING }
 - Returns `Client`
 - baseURL is your wiki.js website API address, usually ends with /graphql
 - token is your wiki.js website API token, created in the administration section

**Client.login()**
 - Returns `String`, the title of the wiki.js website.
 - Used to verify your baseURL and token, so that they work on the API.
 
**Client.pages**
 - Returns `PageManager`
 - Used to access methods related to pages.

**PageManager(Client)**
 - Params: Client
 - Contains page-related methods. 

**PageManager.get( id )**
 - Params: id:INT
 - Returns `Promise <PageObject>`
 - id should be an Int.
 - Used to get a page by ID from the wiki.

**PageManager.search( query )**
 - Params: query:STRING 
 - Returns `Promise <PageSearchResponse>`
 - Search for a page.

**PageManager.search( { query, (path), (locale) } )**
 - Params: Object { query:STRING, path:STRING_OPTIONAL, locale: STRING_OPTIONAL }
 - Returns `Promise <PageSearchReponse>`
 - A more specific method to search for a page.

###Structures

**PageObject**

Properties:
>* id:INT
>* path:STRING
>* hash:STRING
>* title:STRING
>* description:STRING
>* isPrivate:BOOLEAN
>* isPublished:BOOLEAN
>* privateNS:STRING
>* publishStartDate:DATE
>* publishEndDate:DATE
>* tags:PAGETAG
>* content:STRING
>* render:STRING
>* contentType:STRING
>* createdAt:DATE
>* updatedAt:DATE
>* editor:STRING
>* locale:STRING
>* scriptCss:STRING
>* scriptJs:STRING
>* authorId:INT
>* authorName:STRING
>* authorEmail:STRING
>* creatorID:INT
>* creatorName:STRING
>* creatorEmail:STRING

**PageTag**

Properties:
>* id:INT
>* tag:STRING
>* title:STRING
>* createdAt:DATE
>* updatedAt:DATE

**PageSearchResponse**

Properties:
>* results:ARRAY <PAGESEARCHRESULT>
>* suggestions:ARRAY <STRING>
>* totalHits:INT

**PageSearchResult**

Properties:
>* id:STRING
>* title:STRING
>* description:STRING
>* path:STRING
>* locale:STRING