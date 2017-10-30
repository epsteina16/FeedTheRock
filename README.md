Aaron Epstein, Charlie Caron, Nikhil Bhatia-Lin  
Comp20 Final Project | FeedTheRock

### Project title
FeedTheRock

### Problem statement
People generally don’t have a good idea of how to cook/do portion control, which can
cause unhealthy eating, and malnutrition.

### Our solution
A game that helps train the user to learn how to do proper portion control and feed a healthy diet.

### Features that our team will implement
Server-side data persistence
Client side data persistence
Front-end framework

### Data our prototype will be using and collecting
For each user (stored with client-side data persistence):
 * Current game points
 * Level
 * Mode
 * Username
For each level (stored with client-side data persistence):
 * Celebrity recommended calories
 * Calorie count
 * Grams of protein
 * Grams of carbohydrates
 * Grams of fat
 * Grams of saturated fats
 * Grams of sugar
 * Grams of sodium
 * Grams of fiber
For each celebrity:
 * Image of them
 * Age
 * Height
 * Weight
 * Name
 * Gender
 * Is Vegan?
 * Is Vegetarian?
 * Is Gluten Free?
 * Exercise level
 * Party level
We will be using the spoonacular api to get a list of meals and ingredients necessary for those meals, along with the nutrition information for a serving of different foods

### Algorithms or special techniques that will be necessary
We will be using the BMR formula to calculate the recommended calories for each celebrity
We will be using a simple algorithm to calculate the amount of points for each level:
  * A level has a maximum of 100 points
     * 25 points comes from the calorie intake
          * If the calorie intake is over the recommended calorie intake, 
          the amount it is over by is subtracted from the recommended calorie intake
          * We will then do the following to get the points: 
            (calorie intake)/(recommended calories) * 25

      * 75 points comes from nutrition from each meal
          * There are 7 categories for daily nutrition (fats, saturated fats, carbohydrates, 
              fibers, sugars, proteins and sodium)
          * The points for each category will be calculated with the same formula used for calories
          * 50 points are taken off if they are fed something that violates dietary restrictions (e.g. gluten free)


### Wireframes
![Start Screen](/wireframes/startscreen.png)
![Pick Celebrity](/wireframes/pickcelebrity.png)
![Pick Meal](/wireframes/pickmeal.png)
![Make Meal](/wireframes/makemeal.png)

## Comments by Ming
* Fantastic and novel idea.
* Sorry, your list of features are not features.  What will server-side and client be used for? Ditto with email.  A feature is *what* the user(s) will *do*
* Your mockups are too nice.  Now person seeing those mockups will expect same look and feel.
