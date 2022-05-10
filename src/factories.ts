import { Factory } from "fishery";
import { WordWheel, WordWheelDefinition } from "./logic";

export const wordWheelDefinitionFactory = Factory.define<WordWheelDefinition>(
  () => ({
    centerLetter: "A",
    outerLetters: ["A", "A", "A", "A", "A", "A", "A", "A"],
  })
);

export const wordWheelFactory = Factory.define<WordWheel>(() => ({
  definition: wordWheelDefinitionFactory.build(),
  state: { words: [] },
}));
