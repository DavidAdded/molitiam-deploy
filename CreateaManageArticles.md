### General

In strapi, there are different fields for all articles, which needs to be populated for both english and swedish articles.

Images are handled through the media library and have to be uploaded there before they are accessible and useable in the items of the CMS.


### Rich text 

In the articles, there is a text field called article text. 

This text is rendered; not with the default settings of strapi, but with HTML elements. 

Here is a list of elements that can be added for visual changes:

Wrap the element that should have the visual effect with the following tags:

Bold: <b></b>
Italic: <i> </i>
Bigger text, heading elements: <h1> </h1>, <h2> </h2>, ..., <h6> </h6>
Links: <a> </a>

For adding breaks between the lines, please use: <br/>, as many times as needed. 

