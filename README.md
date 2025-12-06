# (a)Jarn Nai (อา)จารย์ไหน (วะ)

The service was designed to address the inconvenience that is caused by instruction list data being provided in an abbreviated form, a practice of Chulalongkorn University Registeration System (or so-called Reg-Chula), and the need for a search system.

บริการนี้ถูกออกแบบมาเพื่อแก้ปัญหาความไม่สะดวกที่เกิดจากการแสดงรายชื่ออาจารย์ในรูปแบบตัวย่อ ซึ่งเป็นแนวปฏิบัติของระบบทะเบียนจุฬาลงกรณ์มหาวิทยาลัย (หรือที่เรียกกันว่า Reg-Chula) และเพื่อรองรับความต้องการระบบค้นหาอาจารย์จากข้อมูลดังกล่าว

# Our Service

The main website availiable at https://jarn-nai.pages.dev

## API

- instructor at https://jarn-nai.pages.dev/api/instructors
search params
  - `q` search all fields
  - `faculty` filtering support multi-facults speard by `,`
  - `department` filtering support multi-departments speard by `,`
  - `sortBy` -> `abbreviation`, `fullName`, `faculty`, `department`(default)
  - `sortOrder` ->  `desc`, `asc`
- all availiable departments at https://jarn-nai.pages.dev/api/departments
- all availiable departments at https://jarn-nai.pages.dev/api/faculties
- metadata at https://jarn-nai.pages.dev/api/metadata

# Disclaimer
The instructor mappings are contributed manually and may contain errors. Please verify the information before use.

# Contribution
We welcome contributions! You can open a Pull Request, or easily suggest a new instructor by creating an issue [here](https://github.com/CP-RektMart/jarn-nai/issues/new?template=add-instructor-abbreviation.yml).
