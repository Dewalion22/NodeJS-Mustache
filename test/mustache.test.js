import Mustache from "mustache"
import fs from "fs/promises"

test("Menggunakan Mustache", () => {
    const data = Mustache.render("Hello {{name}}", {name: "Eko"});
    // Hello Eko
    expect(data).toBe("Hello Eko");
});



test("Menggunakan Mustache Cache", () => {
    Mustache.parse("Hello {{name}}");

    const data = Mustache.render("Hello {{name}}", {name: "Eko"});
    // Hello Eko
    expect(data).toBe("Hello Eko");
});

test("Tags", () => {
    const data = Mustache.render("Hello, {{name}}, my hobby is {{{hobby}}}", {
        name: "Fadel",
        hobby: "<b>Programming</b>"
    });

    expect(data).toBe("Hello, Fadel, my hobby is <b>Programming</b>");
});




test("Nested Object", () => {
    const data = Mustache.render("Hello, {{person.name}}", {
        person : {
        name : "Eko"
    }
    });

    expect(data).toBe("Hello, Eko");
});


test("Mustache File", async () => {
    const helloTemplate =  await fs.readFile("./templates/hello.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        title: "Fadel"
    });


    console.info(data);
    expect(data).toContain("Fadel");
});


test("Section Not Show", async () => {
    const helloTemplate =  await fs.readFile("./templates/person.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {});


    console.info(data);
    expect(data).not.toContain("Hello Person");
});
test("Section Show", async () => {
    const helloTemplate =  await fs.readFile("./templates/person.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        person: {
            name: "fadel",
        }
    });


    console.info(data);
    expect(data).toContain("Hello Person");
});


test("Inverted Sections", async () => {
    const helloTemplate =  await fs.readFile("./templates/person.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {});


    console.info(data);
    expect(data).toContain("Hello Guest");
});

test("List", async () => {
    const helloTemplate =  await fs.readFile("./templates/hobbies.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        hobbies: ["Coding", "Gaming", "Reading"]
    });


    console.info(data);
    expect(data).toContain("Gaming");
});


test("List object", async () => {
    const helloTemplate =  await fs.readFile("./templates/student.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        students: [
            { name: "fadel", value : 100},
            { name: "eko", value : 100},
        ],
    });


    console.info(data);
    expect(data).toContain("fadel");
});

test("Functions", async () => {
    const parameter= {
        name: "Fadel",
        upper: () => {
            return(text, render) => {
                return render(text).toUpperCase();
            }
        }
    }

    const data = Mustache.render("Hello {{#upper}}{{name}}{{/upper}}", parameter);
    expect(data).toBe("Hello FADEL")
})



test("Comment", async () => {
    const helloTemplate =  await fs.readFile("./templates/comment.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
       title: "Fadel"
    });


    console.info(data);
    expect(data).toContain("Fadel");
    expect(data).not.toContain("Komentar");

});


test("Partials", async () => {
    const contentTemplate = await fs.readFile("./templates/content.mustache")
        .then(data => data.toString());
    const headerTemplate = await fs.readFile("./templates/header.mustache")
        .then(data => data.toString());
    const footerTemplate = await fs.readFile("./templates/footer.mustache")
        .then(data => data.toString());

    const data = Mustache.render(contentTemplate, {
        title: "Eko",
        content: "Belajar Mustache JS"
    }, {
        header: headerTemplate,
        footer: footerTemplate
    });

    console.info(data);
    expect(data).toContain("Eko");
    expect(data).toContain("Belajar Mustache JS");
    expect(data).toContain("Powered by Programmer Zaman Now");
});
