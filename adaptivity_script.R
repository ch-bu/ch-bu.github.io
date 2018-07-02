#################################
# Entwicklung einer logistischen 
# Regression zur Berechnung der 
# Fähigkeit, Bruchrechenaufgaben
# der Addition zu lösen
##################################


# Packete laden
library(tidyverse)

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
                          new_data = testing_set,
                          type = "response"))

# Treffe hervorsagen der einzelnen Testdaten
predictions <- ifelse(probabilities > .8, "TRUE", "FALSE")

# Berechne die Akkuratheit des Modells
(results <- table(predictions, adaptivity_data$able))

# Berechne die Akkuratheit des Modells
(results[1, 1] + results[2, 2]) / sum(results)

