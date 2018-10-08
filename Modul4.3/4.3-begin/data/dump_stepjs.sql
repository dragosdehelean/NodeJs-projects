CREATE DATABASE IF NOT EXISTS StepJS;
USE StepJS;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
CREATE TABLE `recipes` (
  `recipe_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `ingredients` text NOT NULL,
  `directions` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`recipe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
INSERT INTO `recipes` VALUES (1,'Chilli con carne recipe','1 red pepper\n2 garlic cloves\n1 tbsp oil\n1 heaped tsp hot chilli powder (or 1 level tbsp if you only have mild)\n1 tsp paprika\n1 tsp ground cumin\n500g lean minced beef\n1 beef stock cube\n400g can chopped tomatoes\n½ tsp dried marjoram\n1 tsp sugar\n2 tbsp tomato purée\n410g can red kidney beans\nplain boiled long grain rice, to serve\nsoured cream, to serve','Prepare your vegetables. Chop 1 large onion into small dice, about 5mm square. The easiest way to do this is to cut the onion in half from root to tip, peel it and slice each half into thick matchsticks lengthways, not quite cutting all the way to the root end so they are still held together. Slice across the matchsticks into neat dice.\n\nCut 1 red pepper in half lengthways, remove stalk and wash the seeds away, then chop. Peel and finely chop 2 garlic cloves.\n\nStart cooking. Put your pan on the hob over a medium heat. Add 1 tbsp oil and leave it for 1-2 minutes until hot (a little longer for an electric hob).\n\nAdd the onion and cook, stirring fairly frequently, for about 5 minutes, or until the onion is soft, squidgy and slightly translucent.\n\nTip in the garlic, red pepper, 1 heaped tsp hot chilli powder or 1 level tbsp mild chilli powder, 1 tsp paprika and 1 tsp ground cumin.\n\nGive it a good stir, then leave it to cook for another 5 minutes, stirring occasionally.\n\nBrown 500g lean minced beef. Turn the heat up a bit, add the meat to the pan and break it up with your spoon or spatula. The mix should sizzle a bit when you add the mince.\n\nKeep stirring and prodding for at least 5 minutes, until all the mince is in uniform, mince-sized lumps and there are no more pink bits. Make sure you keep the heat hot enough for the meat to fry and become brown, rather than just stew.\n\nMake the sauce. Crumble 1 beef stock cube into 300ml hot water. Pour this into the pan with the mince mixture.\n\nAdd a 400g can of chopped tomatoes. Tip in ½ tsp dried marjoram, 1 tsp sugar and add a good shake of salt and pepper. Squirt in about 2 tbsp tomato purée and stir the sauce well.\n\nSimmer it gently. Bring the whole thing to the boil, give it a good stir and put a lid on the pan. Turn down the heat until it is gently bubbling and leave it for 20 minutes.\n\nCheck on the pan occasionally to stir it and make sure the sauce doesn’t catch on the bottom of the pan or isn’t drying out. If it is, add a couple of tablespoons of water and make sure that the heat really is low enough. After simmering gently, the saucy mince mixture should look thick, moist and juicy.','2018-10-08 11:07:29'),(11,'Caesar Salad','For salad\n6 large hearts of romaine, chopped\nFor dressing\n1 cup white, cannellini, or Great Northern beans, drained and rinsed\n½ cup water\n2 anchovies\n4 Tbsp. fresh lemon juice\n1 garlic clove\n4 Tbsp. grated Parmesan\n½ tsp. black pepper\n½ cup extra virgin olive oil\nFor croutons\n2 Tbsp. extra-virgin olive oil\n2 garlic cloves, finely minced\n½ of an 18-inch whole wheat baguette, cubed','Croutons: Preheat the oven to 375 degrees Fahrenheit. In a medium-sized bowl, combine the olive oil and minced garlic. Add the cubed baguette and toss to coat. Spread the croutons on a baking sheet and bake for 5–8 minutes, or until crisp and golden brown.\nDressing: In the container of a food processor combine the beans, water, anchovy, lemon juice, garlic, Parmesan cheese, and black pepper. Process until smooth. With the motor running, slowly add the olive oil to create a creamy, emulsified dressing.\nChop heart of romaine. In a large mixing bowl combine the chopped lettuce and dressing, tossing well to ensure all of the lettuce is coated with the dressing.\nTo serve, divide the salad among six salad plates, and garnish each plate with croutons.','2018-10-08 11:12:14'),(21,'Pumpkin Spice','1 teaspoon ground cinnamon1/4 teaspoon ground nutmeg1/4 teaspoon ground ginger\n1/8 teaspoon ground cloves','In a small bowl, mix together cinnamon, nutmeg, ginger and cloves. Store in an airtight container.','2018-10-08 11:12:14');

UNLOCK TABLES;
