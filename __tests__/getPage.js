const nock = require("nock");

describe("Get a page from the API.", ()=>{
    nock("https://example.com")
        .get("/graphql?query={site{config{title}}}")
        .reply(200,{data: {site: {config: {title: "Example"}}}}).persist();
    const Client = require("../src/Client");
    const testOptions = {
        baseURL: "https://example.com/graphql",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGkiOjEsImdycCI6MSwiaWF0IjoxNjQ5MjAzMjAwLCJleHAiOjE2ODA3MzkyMDAsImF1ZCI6InVybjp3aWtpLmpzIiwiaXNzIjoidXJuOndpa2kuanMiLCJ0eXBlIjoiZmFrZS1hc3MtdG9rZW4ifQ.FEWmrlsNrmbf9ESIgOhECNB_N9wRofUbM6UYLGpUrlw"
    }
    const client = new Client(testOptions);
    it("Get first page.", ()=>{
        nock("https://example.com")
            .get("/graphql?query={pages{single(id:1){id,path,hash,title,description,isPrivate,isPublished,privateNS,publishStartDate,publishEndDate,tags{id,tag,title,createdAt,updatedAt},content,render,contentType,createdAt,updatedAt,editor,locale,scriptCss,scriptJs,authorId,authorName,authorEmail,creatorId,creatorName,creatorEmail}}}")
            .reply(200,{data: {pages: {single: {id: 1}}}});
        client.login().then(()=>{
            client.pages.get(1).then(res => {
                expect(res.id).toBe(1);
            });
        });
    });

    it("Get a non-existent page.", async ()=>{
        nock("https://example.com")
            .get("/graphql?query={pages{single(id:420){id,path,hash,title,description,isPrivate,isPublished,privateNS,publishStartDate,publishEndDate,tags{id,tag,title,createdAt,updatedAt},content,render,contentType,createdAt,updatedAt,editor,locale,scriptCss,scriptJs,authorId,authorName,authorEmail,creatorId,creatorName,creatorEmail}}}")
            .reply(200,{data: {pages: {single: null}}, errors: [{message: "This page does not exist."}]});
        await client.login()
        await expect(client.pages.get(420)).rejects.toEqual(Error("This page does not exist."));
    });
});