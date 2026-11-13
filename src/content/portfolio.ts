export const profile = {
  name: 'Đoàn Công Tài',
  handle: 'tai130203',
  location: 'Ho Chi Minh City, Vietnam',
  github: 'https://github.com/tai130203',
};

export const navigation = [
  { id: 'work', label: 'Work' },
  { id: 'path', label: 'Path' },
  { id: 'skills', label: 'Skills' },
  { id: 'notes', label: 'Notes' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Say hello' },
];

/** Every stop on the page, in order. Drives the constellation map and the active-section observer. */
export const waypoints = [
  { id: 'home', label: 'Start' },
  { id: 'work', label: 'Work' },
  { id: 'path', label: 'Path' },
  { id: 'skills', label: 'Skills' },
  { id: 'notes', label: 'Notes' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export interface Project {
  id: string;
  number: string;
  title: string;
  kind: string;
  description: string;
  tags: string[];
  repo: string;
  source: string;
  filename: string;
  code: string[];
  problem: string;
  structure: string;
  decision: string;
  evidence: string;
}

export const projects: Project[] = [
  {
    id: 'library',
    number: '01',
    title: 'Library Management',
    kind: 'Desktop application',
    description: 'Books, readers, and borrowing workflows, connected through a Java desktop application and a dedicated data layer.',
    tags: ['Java', 'Swing', 'Hibernate', 'SQL'],
    repo: 'https://github.com/tai130203/SE_104',
    source: 'https://github.com/tai130203/SE_104/blob/HEAD/Model/SachModel.java',
    filename: 'Model / SachModel.java',
    code: [
      '@Entity',
      '@Table(name="SACH")',
      'public class SachModel {',
      '   @Id',
      '   @GeneratedValue(strategy = GenerationType.IDENTITY)',
      '   private int MaSach;',
      '   private String TenSach;',
      '',
      '   @ManyToOne',
      '   @JoinColumn(name ="MaTacGia")',
      '   private TacGiaModel MaTacGia;',
      '   // …',
      '}',
    ],
    problem: 'Bring book records, readers, borrowing, returns, and library reports into one desktop application.',
    structure: 'Swing views provide the interface. Controllers connect user actions to application behavior. DAO classes and Hibernate entity models handle persistence and relationships.',
    decision: 'Separate the interface from data access. Book records use entity relationships for authors and categories, while DAO queries assemble the information needed by the views.',
    evidence: 'The public repository includes View, Control, DAO, and Model modules. The source preview shows the actual book entity mapping. This is desktop and data-access work; it is not presented as a web API.',
  },
  {
    id: 'dashboard',
    number: '02',
    title: 'Management Dashboard',
    kind: 'Frontend project',
    description: 'A React interface bringing employee pages, calendars, documents, profiles, and requests into a shared workspace.',
    tags: ['React', 'JavaScript', 'Sass', 'React Router'],
    repo: 'https://github.com/tai130203/QLDA',
    source: 'https://github.com/tai130203/QLDA/blob/HEAD/src/App.js',
    filename: 'src / App.js',
    code: [
      '<Routes>',
      '  {publicRoutes.map((route, ind) => {',
      '    const Layout = route.layout ? route.layout : Fragment;',
      '    const Page = route.component;',
      '    return (',
      '      <Route',
      '        key={ind}',
      '        path={route.path}',
      '        element={<Layout><Page /></Layout>}',
      '      />',
      '    );',
      '  })}',
      '</Routes>',
    ],
    problem: 'Organize common management tasks into distinct pages with a consistent navigation and layout.',
    structure: 'React pages sit inside a shared layout with a header and sidebar. React Router maps the employee, calendar, document, profile, and request pages. Sass modules style individual components.',
    decision: 'Keep the route configuration in one place and apply a shared layout to the relevant pages. The login page can use its own layout without repeating the navigation in every page.',
    evidence: 'The route table and page components are available in the public repository. This case study covers the frontend; a connected backend, authentication system, and production deployment are not claimed.',
  },
];

export const skillGroups = [
  { number: '01', symbol: '</>', title: 'Interfaces', description: 'From a reusable component to a page that feels considered.', tags: ['React', 'JavaScript', 'HTML & CSS', 'Sass'], evidence: 'In practice: Management Dashboard', project: 'dashboard' },
  { number: '02', symbol: '{ }', title: 'Applications & data', description: 'The logic and relationships that make an application useful.', tags: ['Java', 'Swing', 'Hibernate', 'JDBC', 'SQL'], evidence: 'In practice: Library Management', project: 'library' },
  { number: '03', symbol: '↗', title: 'Tools & workflow', description: 'Readable source, versioned changes, and a clear path to the build.', tags: ['Git', 'GitHub', 'TypeScript', 'Vite'], evidence: 'Explore this portfolio’s source', url: 'https://github.com/tai130203/tai130203-portfolio' },
];

export interface Station {
  id: string;
  label: string;
  symbol: string;
  status: 'built' | 'next';
  title: string;
  detail: string;
  evidence: string;
  project?: string;
}

/** The layers a request passes through, each tied to what the public projects actually show. */
export const stations: Station[] = [
  {
    id: 'interface', label: 'Interface', symbol: '</>', status: 'built',
    title: 'What people see and touch.',
    detail: 'React pages and Sass-styled components in the Management Dashboard, Swing views in Library Management. Different toolkits, the same job: make the next action obvious.',
    evidence: 'Employee, calendar, document, profile, and request pages.',
    project: 'dashboard',
  },
  {
    id: 'routing', label: 'Routing', symbol: '⇄', status: 'built',
    title: 'Every action finds its place.',
    detail: 'One route table maps each page to its component and layout. Most pages share a header and sidebar; the login page stands on its own.',
    evidence: 'src / App.js, the route table.',
    project: 'dashboard',
  },
  {
    id: 'api', label: 'API', symbol: '···', status: 'next',
    title: 'The bridge between two worlds.',
    detail: 'An HTTP API is what lets a web interface talk to application logic and a database. My public projects cover both sides of this bridge, but not yet the bridge itself.',
    evidence: 'Not in a public project yet. This is the full-stack step I’m working toward, and I’d rather say so than imply it.',
  },
  {
    id: 'logic', label: 'Logic', symbol: '{ }', status: 'built',
    title: 'Rules live in one place.',
    detail: 'In Library Management, controllers sit between the views and the data layer. They turn what a user does on screen into what the application should do next.',
    evidence: 'The Control module, between View and DAO.',
    project: 'library',
  },
  {
    id: 'data', label: 'Data', symbol: '▤', status: 'built',
    title: 'Relationships worth keeping.',
    detail: 'DAO classes and Hibernate entities persist books together with their authors and categories, and assemble what each view needs.',
    evidence: 'Model / SachModel.java, the book entity.',
    project: 'library',
  },
];

export const notes = [
  {
    source: 'Library Management',
    title: 'Keep the screen away from the database.',
    body: 'The application is split into View, Control, DAO, and Model modules. A change to how a book is stored doesn’t have to touch how it is displayed, and the other way round.',
    takeaway: 'Layers are a way of deciding where a change belongs.',
    url: 'https://github.com/tai130203/SE_104',
    link: 'See the modules',
  },
  {
    source: 'Management Dashboard',
    title: 'One route table beats many special cases.',
    body: 'Every page is described in one list: its path, its component, and its layout. Adding a page is one entry, and the login page opts out of the shared header and sidebar in that same list.',
    takeaway: 'Put the decision in data and the code stays boring.',
    url: 'https://github.com/tai130203/QLDA/blob/HEAD/src/App.js',
    link: 'Read the route table',
  },
  {
    source: 'This portfolio',
    title: 'Motion is a layer, not a requirement.',
    body: 'The portal sequence, the pointer lighting, and the night sky here are written by hand with CSS and a small canvas, without an animation library. On phones, short screens, and with reduced motion turned on, the same story reads in normal flow.',
    takeaway: 'If the page works without the effect, the effect is safe to add.',
    url: 'https://github.com/tai130203/tai130203-portfolio',
    link: 'Explore the source',
  },
];
