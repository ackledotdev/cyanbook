# cyanbook

A fully open-sourced mock Bluebook experience so AP students can take real practice tests with the feeling of the Bluebook interface.

**This project is not associated with CollegeBoard. Bluebook is CollegeBoard's product.** This project does not claim or intend to replace Bluebook's testing functionality. This project seeks to *imitate* the interface of Bluebook solely for practice.

## Mirroring

This project lives on [Codeberg](https://codeberg.org/ackledotdev/cyanbook) and is mirrored (intended readonly) on [GitHub](https://codeberg.org/ackledotdev/cyanbook). See [GiveUpGitHub](https://sfconservancy.org/GiveUpGitHub/) and [Codeberg's mirroring article](https://codeberg.org/Recommendations/Mirror_to_Codeberg#1-why-should-we-mirror-to-codeberg) for more information.

## Roadmap

This project is in the construction phase and not at all ready for testing.

### Todos

- [ ] Create fully styled and operational FRQ entry page
- [ ] Add prompt import to FRQ entry page
- [ ] Add exporting to FRQ entry page
- [ ] Style FRQ properly
- [ ] Scaffold MCQ entry (steal from [ackledotdev/association-quiz](https://github.com/ackledotdev/association-quiz) and restyle)
- [ ] Add MCQ test import
- [ ] Add MCQ grading and export
- [ ] Style MCQ properly
- [ ] Add timers

## Functionality

**This is TODO functionality.**

Only one type of test may be taken at a time: FRQ or MCQ. For MCQ tests, correct answers may be supplied for in-app grading and feedback. For FRQs, the responses may be exported for sharing.

Test data must be entered in the specified JSON format. ~~See the examples folder for examples.~~ See below:

### Data schema proposal

```jsonc
{
    "subject": "Literature and Composition",
    "type": "MCQ",
    "comment": "Practice MCQ 1", // optional
    "questions": [
        {
            "prompt": "The imagery in the passage suggests all of the following about Satan EXCEPT his",
            "passage": {
                "text": "Now to the ascent of that steep savage hill\nSatan had journeyed on, pensive and slow;\nBut further way found none; so thick entwined,\nAs one continued brake, the undergrowth\nOf shrubs and tangling bushes had perplexed\nAll path of man or beast that passed that way. . .",
                "attribution": "(1667)"
            },
            "responses": [
                { "text": "pride", "correct": false },
                { "text": "stealthiness", "correct": false },
                { "text": "rapaciousness", "correct": false },
                { "text": "stupidity", "correct": true },
                { "text": unscrupulousness", "correct": false }
            ]
        },
        // . . .
    ]
}
```

FRQ would be similar, with three question objects of the following format:

```jsonc
{
    "type": "poetry",
    "prompt": "In Victor Hernández Cruz’s poem “Two Guitars,” published in 2001, the speaker imagines that two guitars are alive and engaging in conversation about their musical experiences. Read the poem carefully. Then, in a well-written essay, analyze how Hernández Cruz uses literary elements and techniques to convey a complex portrayal of the guitars’ musical world.",
    "passage": {
        "title": "Two Guitars",
        "body": ". . .", // passage body
        "footnotes": [
            "Text for first footnote."
        ],
        "lineNumbers": true
    }
}

{
    "type": "prose",
    "prompt": "The following excerpt is from Brenda Peynado's short story “The Rock Eaters,” published in 2021. In this passage, the narrator is one of a group of people who left their home country after developing the ability to fly, an ability that is accepted as realistically possible within the story. Years later, the group returns to that country with their children. Read the passage carefully. Then, in a well-written essay, analyze how Peynado uses literary elements and techniques to convey the narrator's complex experience of this return home.",
    "passage": {
        "text": ". . .",
        "lineNumbers": true
    }
}

{
    "type": "open",
    "prompt": "Many works of literature feature a rebel character who changes or disrupts the existing state of societal, familial, or political affairs in the text. They may break social norms, challenge long-held values, subvert expectations, or participate in other forms of resistance. The character's motivation for this rebellious behavior is often complex. Either from your own reading or from the list below, choose a work of fiction in which a character changes or disrupts the existing state of societal familial, or political affairs. Then, in a well-written essay, analyze how the complex motivation of the rebel contributes to an interpretation of the work as a whole. Do not merely summarize the plot.",
    "list": [ "Antigone", "Arcadia" //, . . . ]
}
```

