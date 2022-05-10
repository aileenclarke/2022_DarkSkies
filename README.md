# Dark Skies

### Team Members
Aileen Clarke
Austin J Novak
Jake Steinberg

### Project Proposal

#### Target User Profile (Persona):

Juno is a reader who is curious about the world around her. She’s a regular reader of popular science articles on the internet. She grew up in Madison but now lives in the Chicago metropolitan area. Juno likes to spend time outdoors, but over the past couple years Juno has spent most of her time in the city. She’s antsy to learn more about the places around her.

Juno doesn’t consider herself technologically advanced and she’s intimidated by complex interfaces. Juno knows you can’t see the night sky as well in the city, but she doesn’t understand why besides there being “too much light.” She’d like to better understand what there being “too much light” means. She’s also heard of so-called “Dark Sky Sanctuaries,” but doesn’t know what’s special about them or even where the nearest one is. 

#### User Case Scenario 

Upon arriving at the interactive, Juno is greeted by a vibrant celestial scene, unlike one she’s ever seen in reality. She starts to scroll, and watches the stars and galaxies fade away and a glowing city comes into view. Text blocks explain to Juno she’s not alone in experiencing this. Despite humans living with dark skies for most of their existence, those skies have become increasingly scarce in the modern world. 

She gives the page permission to access her location by clicking a button. As she scrolls, the next map zooms into her neighborhood, then zooms out to her city, then out to a view of the entire US. This sequence allows Juno to visually identify the phenomenon of “too much light” and associate it with the neighborhood she lives in.

Juno then sees a graphic depicting the phenomena of “too much light.” It shows how in areas with no artificial light, the only sources of light come from the stars in the night sky. But in an area with lots of artificial light, those light sources “crowd” out the light from the stars. This gives Juno insight, allowing her to finally understand the “too much light” phenomenon. She’s introduced to the term “light pollution.”

The interactive then returns to the U.S. view. It shows Juno that, within her lifetime, light pollution has expanded considerably. She’s then taken on a tour of examples, such as booming oil and gas fields of North Dakota or fast-expanding southern cities like Houston. Juno uses a slider prompt to compare how light pollution has grown in these areas. This gives Juno insight into the economic and development patterns that cause and promote light pollution.

Then, Juno sees a series of graphics depicting humans and wildlife as constellations, along with text that explains how light pollution affects physiology. Next, she learns about what is being done to mitigate these harms. As she scrolls, she sees the proliferation of dark spaces over a sequence of years. She identifies the patterns of dark sky place creation across the southwestern US. As she continues to scroll, she’s introduced to several types of dark sky spaces, which are filtered on the map. She sees a new pattern of dark sky spaces being established in urban areas over recent years. Finally, Juno retrieves information about some parks in her area by clicking on points.


#### Requirements
| # | Name | Info|
| :---: | :---: | :--- |
| 1 | Basemap | US, Canada, Mexico, US states, additional context (lakes, rivers): Mapbox/OSM. (2-dimensional) |
| 2 | Dark Sky Sanctuaries | Locations of Dark Sky Sanctuaries in the US: International Dark-Sky Association(IDA). Symbolized as points on the map. (2-dimensional) |
| 3  | Light Pollution | Light pollution raster data. Will include most recent available, plus at least 1 historic: NASA VIIRS, Earth Observation Group. |
| 4  | Light Pollution Graphic | "Simple diagram we will make depicting how radiance/reflection works, made in AI/PS. |
| 5  | Constellation Graphic | Graphic to accompany text explaining the effect of light pollution on physiology, made in AI/PS. |
| 6  | Brightness Legend | Indicate brightness/radiance level for color range. Accompanying light pollution data. |
| 7  | Dark Sky Spaces Legend | Indicate which color is associated with each type of dark sky space as denoted by the IDA. |
| 8  | Text | Text accompaniment. Intro, info about places on tour, guide for search use. |
| 9  | Title | Title image/illustration. Made in PS. |
| 10 | Video | Narrated video demonstrating functionality. |


#### Interaction
| # | Interaction | Info|
| :---: | :---: | :--- |
| 1 | Scroll | Primary means of accessing subsequent content. Performs similar functionality to zoom and pan. |
| 2 | Image Compare Slider | Overlay: Objects. Display and compare the data over the same area, from two different years. |
| 3 | Sanctuary Hover or Selection | "Retrieve: Object. Click a point representing a Dark Sky Space to see its name, size, year of designation in a pop up. |
| 4 | Reset Button | Reexpress: Object. Allow user to reset slippy map to the relevant extent by clicking a home button. |
| 5 | Location Permission Buttons | Buttons for user to click to agree to share location or to proceed without sharing location. |


#### Wireframes

This is the most complete and up to date wireframe for the final interactive portion of the story. 
![Main Wireframe](img/main-wireframe.jpg)

Storyboard versions
![Storyboard v1](img/storyboard-v1.jpg)

![storyboard v2](img/storyboard-v2.jpg)

![Storyboard v3.1](img/storyboard-v3.jpg)

![Storyboard v3.2](img/storyboard-v31.jpg)
