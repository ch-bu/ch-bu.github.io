#################################
# Entwicklung einer logistischen 
# Regression zur Berechnung der 
# Fähigkeit, Bruchrechenaufgaben
# der Addition zu lösen
##################################


# Packete laden
require(tidyverse)

# Daten laden
adaptivity_data <- read.csv("http://ch-bu.github.io/adaptivity_data.csv", 
                            sep = ",") %>%
  mutate(
    able = factor(able),
    z_correct = scale(correct),
    z_prior_knowledge = scale(prior_knowledge)
  )

# Falls ihr tidyverse nicht installiert habt:
# adaptivity_data <- read.csv("http://ch-bu.github.io/adaptivity_data.csv", 
#                             sep = ",")
# adaptivity_data$able <- factor(adaptivity_data$able)
# adaptivity_data$z_correct <- scale(adaptivity_data$correct)
# adaptivity_data$z_prior_knowledge <- scale(adaptivity_data$prior_knowledge)

# Kurzer Blick auf den Datensatz
glimpse(adaptivity_data)
# Oder
# adaptivity_data

################################
# Die Akkuratheit einfach ausrechnen
################################
# Get size of training set specific to dataset
smp_size <- floor(0.65 * nrow(adaptivity_data))

# Get row ids of training set
train_ind <- sample(seq_len(nrow(adaptivity_data)), size = smp_size)


# Datasets split into training and testing
training_set <- adaptivity_data[train_ind, ]
testing_set <- adaptivity_data[-train_ind, ]

# Bilde logistisches Regressionsmodell
(model <- glm(able ~ correct + prior_knowledge, 
              family = "binomial",
              data = training_set))

# Berechne Wahrscheinlichkeiten der richtigen
# Lösung anhand des Testing Sets
(probabilities <- predict(model, 
                          newdata = testing_set,
                          type = "response"))


# Treffe hervorsagen der einzelnen Testdaten
(predictions <- ifelse(probabilities > .8, "TRUE", "FALSE"))

# Zeige die Tabelle der Hervorsgaen an
(results <- table(predictions, testing_set$able))

# Fall die Tabelle zu klein ist, gebe NA zurück
if (nrow(results) < 2) {
  accuracy <- results[1, 1] / sum(results)
} else if (ncol(results) < 2) {
  accuracy <- results[1, 1] / sum(results)
} else {
  accuracy <- (results[1, 1] + results[2, 2]) / sum(results)
} 

print(accuracy)


################################
# Boostrapping anhand von 100 
# Durchläufen
################################
get_accuracy <- function(dataset) {
  # Get size of training set specific to dataset
  smp_size <- floor(0.65 * nrow(dataset))
  
  # Get row ids of training set
  train_ind <- sample(seq_len(nrow(dataset)), size = smp_size)
  
  
  # Datasets split into training and testing
  training_set <- dataset[train_ind, ]
  testing_set <- dataset[-train_ind, ]
  
  # Bilde logistisches Regressionsmodell
  (model <- glm(able ~ correct + prior_knowledge, 
                family = "binomial",
                data = training_set))
  
  # Berechne Wahrscheinlichkeiten der richtigen
  # Lösung anhand des Testing Sets
  (probabilities <- predict(model, 
                            newdata = testing_set,
                            type = "response"))
  

  # Treffe hervorsagen der einzelnen Testdaten
  (predictions <- ifelse(probabilities > .8, "TRUE", "FALSE"))
  
  # Zeige die Tabelle der Hervorsgaen an
  (results <- table(predictions, testing_set$able))
  
  # Fall die Tabelle zu klein ist, gebe NA zurück
  if (nrow(results) < 2) {
    accuracy <- results[1, 1] / sum(results)
  } else if (ncol(results) < 2) {
    accuracy <- results[1, 1] / sum(results)
  } else {
    accuracy <- (results[1, 1] + results[2, 2]) / sum(results)
  } 

  # Return
  accuracy
}

get_accuracy(adaptivity_data)


# Bootstraping
# Wiederhole das gleiche Prozedere 100 mal
bootstrapped_accuracies <- 1:100 %>% 
  map_dbl(~ get_accuracy(adaptivity_data))

# Show histogram of bootstrapped accuracies
hist(bootstrapped_accuracies)

# Bekomme durchschnittlichen Adaptivitätswert
mean(bootstrapped_accuracies, na.rm = TRUE)

