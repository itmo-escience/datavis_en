# PRACTICE 1

## GIT

In this course, we will be using a tool called `git` to track changes to our code. We'll also be using Github, an online tool for hosting git repositories. So first you need to sign up for a [github](https://github.com/) account (if you don't already have one).

And we will also use `git` as a version control system. You can download `git` [here](https://git-scm.com/downloads).
You can use `git` directly from the command line or using any of GUI clients such as [gitkraken](https://www.gitkraken.com/).
Then we need to configure username and email address which we've used in our github account.
```
# using command line
git config --global user.name "YOUR NAME"
git config --global user.email "YOUR EMAIL ADDRESS"
```
First we need to `clone` this repository using a link from `github` page to have it`s copy on our machine. 
```
# cd to the directory you want put this repo

git clone PUT_URL_HERE  -o practice
```
When we've made some changes to files in our repo we need to add it to `stage` where they'll be ready to be included in the next `commit`. 
```
git add .
```
When our `stage` is ready we can make a `commit` with no empty message. 
```
git commit -m "initial commit"
```

Once new `commit` is in our local repo we might want to `push` it to remote repo on `github`. 

So first we need to create one. Create a new repository on the [github](https://github.com/) and name it following the `datavis-hw-lastname-firstname` naming convention.
Ensure your new repository is private and don't click the option to "Initialize the repository with a README".

Run the two commands described on GitHub under the heading "Push an existing repository from the command line".

Now all of our changes are in the remote repo.

Last thing we need is configure our `github` repo to host our static files.
On your `github` repo page go to Settings > GitHub Pages and set the Source to `master branch`. And after short period of time this section will include the link to root of your hosted
application. Using received url you can navigate throw the folders of your repo. If your directory contains `index.html` file it will be rendered automatically when you navigate to this folder. 

## Setting up

What we want develop is a simple web-page with a data visualisation logic. Our web-page is a set of files, hosted by some server application. We can use a local server running inside your folder or one of the web services such as [codesandbox](https://codesandbox.io/).
To set up a local server you can use any static http-server application you like. For example if you have Python installed you can use following commands to start local server depending on your Python version. 
```
# If Python version returned above is 3.X
python -m http.server
# If Python version returned above is 2.X
python -m SimpleHTTPServer
```
If you like `node` for example you can use [this](https://www.npmjs.com/package/http-server) module.

Once you have your server running you can access your app on `localhost` domain via link provided in log.

## HTML

HTML is a standard markup language for creating Web pages. Html-document consists of tags. HTML tags normally come in pairs like `<p>` and `</p>`.
Below is a simple template of html-document.
```
<!DOCTYPE html>
<html>
    <head>
            <title>DataVis</title>
    </head>
    <body>
        <h1>Practice 1</h1>
    </body>
</html>
```
Here:

* The `<!DOCTYPE html>` declaration defines this document to be HTML5.
* The `<html>` element is the root element of an HTML page
* The `<head>` element contains meta information about the document
* The `<title>` element specifies a title for the document
* The `<body>` element contains the visible page content
* The `<h1>` element defines a large heading

Html consists of large number of tags all following this template:
```html
    <tagname>Content goes here...</tagname>
```
### Attributes

All HTML elements can have attributes.

* Attributes provide additional information about an element
* Attributes are always specified in the `start tag`
* Attributes usually come in `name/value` pairs like: `name="value"`
* Attributes can define a state of element and include only `name` like `disabled` or `selected`

### SVG

SVG is a language for describing 2D graphics in XML. SVG has several methods for drawing paths, boxes, circles, text, and graphic images.

[Here](https://codesandbox.io/embed/small-feather-osv67?fontsize=14&hidenavigation=1&theme=dark) is an example of basic shapes in svg. 

## CSS

CSS (cascading style sheet) is consists of selector and set of rules.

```css
selector { property: value }
```

There are three ways to use styles on elements on html-page.
* Inline Style (using `style` attribute of HTML element)
* Internal Style Sheet (using `<style>` tag inside the `<head>` tag)
* External Style Sheet (import using `<link>` tag inside the `<head>` tag)

[Here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) described all of selector types. In our case we'll need only a class and id selectors.

A set of rules are the declarations, which take the form of property and value pairs. Each pair specifies a property of the element(s) we are selecting, then a value that we'd like to give the property.
Using css we can in one line for example set a size, type and color of elements border and set it's `background-color` as well as text `color`.
```css
span {
  border: 1px solid black;
  background-color: lime;
  color: red;
}
```

We will not go to deep in to css here since we don't need much of it in 2D graphics. If you're interested to learn more about CSS there are some links in Resources section.

## JavaScript

JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions(function that can be used as variables). JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.

JavaScript enables us to define rules for dynamic update of the content of html page. 

### Variables

There are two ways to declare a variable in JavaScript `var` and `let`.

The difference between `var` and `let` is historical. First there was only `var`. But it has some serious issues.
```JavaScript
    // for example you can declare a variable with a same name multiple times
    var myName = 'Chris';
    var myName = 'Bob';
```
Therefore it is recommended to use `let` instead of `var` when you need a variable.

Here is some notes about variable naming in JavaScript:
* Variable names cannot contain spaces.
* Variable names must begin with a letter, an underscore (_) or a dollar sign ($).
* Variable names can only contain letters, numbers, underscores, or dollar signs.
* Variable names are case-sensitive.

JavaScript is also has constants. To declare a constant use a `const` keyward. 
When declare a constant object it creates immutable binding between a constant name and an object so you cannot assign a new value to it:
```JavaScript
const obj = {a:1, b:2};

obj = 2; // Uncaught TypeError: Assignment to constant variable.
```
but you still can modify an object itself:
```JavaScript
obj.c = 3 // {a:1, b:2, c:3}

delete obj.a // {b:2, c:3}
```
### Types

JavaScript is dynamically typed languege. So the variables are not bound to any data type.

There are eight basic data types in JavaScript:
* number (represents both integer and floating point numbers);
* BigInt (represents numbers greater then `2**53`);
* string
* boolean (logical data type);
* null (contains only the null value);
* undefined (means that value is not assigned);
* object (are used to store collections of data and more complex entities);
* function

### DOM

In web-browser environment we have multiple objects(like [`document`](https://www.w3schools.com/jsref/dom_obj_document.asp), [window](https://www.w3schools.com/jsref/obj_window.asp) or [location](https://www.w3schools.com/jsref/obj_location.asp)), classes(like [Math](https://www.w3schools.com/jsref/jsref_obj_math.asp) or [Date](https://www.w3schools.com/jsref/jsref_obj_date.asp)) and [methods](https://www.w3schools.com/jsref/jsref_obj_global.asp). 

DOM(document object model) is a representation of html-document in memory. Once browser receives the html-file in transforms it to DOM.
`Document` is the object represented the DOM(document object model) in javascript.
Nodes in DOM are represents the elements(tags) in html-document. Using a `document` object we can query for DOM nodes, manipulate it's properties, add and remove nodes from DOM.

For example here add three elements to a list:
```html
<ul id="ul"></ul>

<script>
    const ul = document.getElementById('ul');
    function getListContent() {
    let fragment = new DocumentFragment(); // DocumentFragment() hold a list of nodes till append()

    for(let i=1; i<=3; i++) {
        let li = document.createElement('li');
        li.append(i);
        fragment.append(li);
    }

    return fragment;
    }

    ul.append(getListContent()); //<ul>
                                  //<li>1</li>
                                  //<li>2</li>
                                  //<li>3</li>
                                //</ul>
</script>
```

## Resources

* [w3schools](https://www.w3schools.com/) - resource for learning web technologies;
* [developer.mozilla](https://developer.mozilla.org/en-US/docs/Learn) - resource about web development technologies;
* [javascript.info](https://javascript.info/) - resource about JavaScript;
* [DOM nodes](https://javascript.info/dom-nodes)