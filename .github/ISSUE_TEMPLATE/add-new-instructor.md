name: "Add Instructor Abbreviation"
about: "Automated Add Instructor"
title: "[Instructor] Add Instructor Abbreviation: <Abbreviation>"
labels: ["🧑‍🏫 instructor"]
assignees:
  - yokeTH

body:
  - type: input
    id: abbreviation
    attributes:
      label: Abbreviation
      description: e.g. TNP
      placeholder: TNP
    validations:
      required: true

  - type: input
    id: full_name
    attributes:
      label: Full Name
      description: e.g. THANAPON Johdee
      placeholder: THANAPON Johdee
    validations:
      required: true

  - type: input
    id: faculty
    attributes:
      label: Faculty
      description: e.g. Engineering
      placeholder: Engineering
    validations:
      required: true

  - type: input
    id: department
    attributes:
      label: Department
      description: e.g. Computer Engineering
      placeholder: Computer Engineering
    validations:
      required: true

  - type: textarea
    id: additional_notes
    attributes:
      label: Additional Notes (optional)
      description: e.g. mapped from course 2110101, etc.
      placeholder: mapped from course 2110101, etc.
    validations:
      required: false
