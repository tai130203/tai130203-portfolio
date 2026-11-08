# Portfolio analysis and implementation plan

## 1. Confirmed brief

| Item | Decision |
| --- | --- |
| Owner | Đoàn Công Tài / tai130203 |
| Primary goal | Full-stack job applications |
| Language | English |
| Visual direction | Dark technology aesthetic; midnight navy, warm peach, soft atmospheric imagery |
| Reference | https://1longg-dev.vercel.app/ |
| Repository | tai130203/tai130203-portfolio |
| Current scope | Analyze the reference, create this repository, and document the plan |

No website implementation, dependency installation, or deployment is included in this planning stage.

## 2. Analysis of the reference

### Visual composition

The reference uses a floating pill-shaped header, an immersive first screen, large contrasting type, warm primary buttons, and a luminous portal illustration. A dark atmospheric background connects the sections. Desktop composition separates the introduction and artwork; the narrow layout stacks the content and gives the illustration its own space.

Its visual identity comes from the combination of a navy canvas, peach highlights, a monospaced headline, an italic display accent, and controlled negative space. The artwork and typography establish the experience before the smaller decorative effects do.

### Content and visitor journey

The page progresses through introduction, a statement of principles, capability areas, technology groups, project explorations, working approach, personal background, and contact. Navigation jumps to sections on the same page.

The three example projects are explicitly described as concept studies. They are visual explorations rather than evidence of shipped Full-stack applications. For this portfolio, project evidence should appear immediately after the hero and should use the owner's actual work.

### Technical observations

The publicly delivered page contains one stylesheet and seven ordinary JavaScript files: app.js, motion.js, polish.js, stage.js, cards-gl.js, ship.js, and ui.js. The inspected files implement Canvas effects, WebGL2 scenes, pointer parallax, scroll reveals, project dialogs, a custom cursor, and a flying object. No framework runtime was identified in the delivered HTML.

The hero uses a static portal image enhanced by WebGL depth effects. Project illustrations also have WebGL scenes. The code includes static fallbacks, reduced-motion handling, and visibility checks for animation loops. These are meaningful requirements for any similar effect.

Observed first-party sources:

- [Page](https://1longg-dev.vercel.app/)
- [Styles](https://1longg-dev.vercel.app/style.css)
- [Hero rendering](https://1longg-dev.vercel.app/stage.js)
- [Project rendering](https://1longg-dev.vercel.app/cards-gl.js)
- [Motion](https://1longg-dev.vercel.app/motion.js)
- [Project dialogs](https://1longg-dev.vercel.app/app.js)

### What to carry into the new portfolio

| Reference element | Proposed treatment |
| --- | --- |
| Navy/peach palette and large type | Retain the direction, with original personal branding |
| Portal artwork and atmosphere | Reuse the owner's original generated illustration; set headlines in HTML |
| Long sequence of presentation sections | Shorten the journey and place work directly after the hero |
| Concept project cards | Replace with real, accurately labeled projects and technical case studies |
| Pointer and scroll effects | Use subtle desktop parallax and section reveals, with touch and reduced-motion fallbacks |
| WebGL scenes, roaming object, command menu | Defer until the core portfolio is complete and measured |

## 3. Proposed page structure

### Header

Personal wordmark, Work, Skills, About, and Contact. On narrow screens use a compact accessible menu. A CV link appears only when an actual public CV is provided.

### Hero

Display the name and Full-stack career direction clearly, followed by a short factual introduction. Use the original portal illustration as a separate asset so that text remains readable and responsive. Primary action: view selected work. Secondary action: contact.

### Selected work

Start with two substantial case studies. Every card has a real screenshot, a concise problem statement, honest scope, a technology summary, and a working repository link. Show a live-demo action only when a working demo exists.

A case study should answer:

1. What problem does the project solve?
2. What did Tài personally implement?
3. What are the frontend, backend, and database responsibilities, where applicable?
4. What is one concrete technical decision or tradeoff?
5. What tests, screenshots, or reproducible behavior support the explanation?

Use an accessible project dialog for detail in version one. Keep code links usable without opening the dialog. Dedicated case-study routes can be considered later if project narratives need shareable URLs.

### Skills

Group verified technologies into Frontend, Application/Data, and Tools when supported by the supplied project evidence. Use readable labels and a small number of recognizable icons. Present capabilities through examples rather than percentage bars.

### About

A concise personal introduction, location, and Full-stack career interests. Add work history, education, or availability only after the owner confirms them.

### Contact and footer

Use confirmed channels. GitHub is available now; email, LinkedIn, and CV are content inputs. Every displayed action must work. Contact links are sufficient for the first version; a contact API is unnecessary for the core visitor journey.

## 4. Evidence and content gaps

| Candidate | Confirmed public evidence | Accurate portfolio label |
| --- | --- | --- |
| SE_104 | Java, Swing, Hibernate; library-management modules | Desktop application / application and data access |
| QLDA | React, JavaScript, Sass; employee, calendar, document, profile, and request interfaces | Frontend project |
| QuanLyThuVien | Java, JDBC, SQL scripts | Additional desktop/data-access work; optional supporting link |

A connected web frontend, HTTP API, and database have not yet been verified as one complete project. Java desktop data access alone does not establish that evidence. Before writing a Full-stack case study, obtain an existing shareable project or confirmed backend/API details from the owner. A new demonstration project would be separate work, not a hidden requirement of building the portfolio.

Needed from the owner before content completion:

- A project with backend/API and database details that can be shared publicly, if available.
- Personal contribution and one technical challenge for each selected project.
- Project screenshots or permission to prepare screenshots using suitable demo data.
- Contact email, LinkedIn URL, and a public CV if those actions should appear.
- Confirmed work or education details if they should be included.

Do not publish internal company code, private application screenshots, invented metrics, or unsupported production claims.

## 5. Proposed implementation

- **Frontend:** React, TypeScript, and Vite, producing a static site.
- **Styling:** custom CSS with shared colors, typography, spacing, and responsive rules.
- **Content:** one typed portfolio data file for projects, skills, and verified links.
- **Motion:** CSS transforms, IntersectionObserver, and a small optional Canvas star layer. Pause animation outside the viewport or while the document is hidden; honor reduced-motion preferences.
- **Dialogs:** native HTML dialog behavior with visible close controls, Escape support, focus restoration, and usable keyboard navigation.
- **Assets:** original artwork and real project screenshots. Optimize delivery and self-host the limited font set.
- **Hosting proposal:** connect this repository to Vercel for preview deployments and a public production URL when implementation is ready. Hosting is not configured in this planning stage.

The portfolio itself does not need a database, login, CMS, or server-rendered pages to demonstrate the owner's Full-stack work.

Proposed source layout, to be created during implementation:

```text
src/
  components/
  sections/
  content/portfolio.ts
  styles/
  assets/
public/
```

## 6. Delivery sequence

| Stage | Work | Reviewable result |
| --- | --- | --- |
| 1. Content and wireframe | Confirm project evidence and contact details; write English copy; map desktop/mobile composition | Final content inventory and section layout |
| 2. Visual foundation | Implement colors, type, header, hero, and the original artwork composition | Recognizable desktop/mobile first screen |
| 3. Complete visitor journey | Add real project cards, case studies, skills, about, and contact | All sections and actions work |
| 4. Motion and polish | Add restrained parallax, reveals, and ambient effects with fallbacks | Coherent interaction pass without blocking navigation |
| 5. Validation and publication | Run checks, keyboard and responsive review, asset optimization, and a production build; connect hosting | Verified preview, then public portfolio |

Advanced WebGL effects are an optional follow-up after the core experience passes the checks below. They should not delay real project content or contact actions.

## 7. Acceptance criteria

- The site is in English and clearly identifies Đoàn Công Tài and the intended Full-stack role.
- The first screen provides a clear path to work and contact.
- At least two real projects are described accurately; frontend-only or desktop work remains labeled accordingly.
- All displayed project, contact, and CV links work. Unavailable actions are omitted.
- Layouts are checked at 375, 768, and 1440 CSS pixels without horizontal overflow.
- Navigation and dialogs work with a keyboard, with visible focus and a skip link.
- The site remains usable with reduced motion and without optional graphics enhancements.
- Type checking and a production build pass.
- Browser checks cover navigation, opening/closing project details, Escape, focus return, and external links.
- Lighthouse goals: at least 90 for performance and 95 for accessibility and SEO on representative runs. These are implementation targets, not measurements already achieved.
- Original project files and runtime data from unrelated repositories are not included.

## 8. Research limits and current status

Research included the public HTML, stylesheet, seven JavaScript assets, and desktop/narrow-screen screenshots. Shader behavior and some interactions were identified from source inspection; every interactive state was not manually exercised. No Lighthouse, field-performance, or physical-phone GPU benchmark has been run.

This repository currently contains planning documents only. The website and hosting will be created in the implementation stage.
