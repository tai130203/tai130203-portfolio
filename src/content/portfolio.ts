export const profile = {
  name: 'Đoàn Công Tài',
  handle: 'tai130203',
  location: 'Ho Chi Minh City, Vietnam',
  github: 'https://github.com/tai130203',
};

export const navigation = [
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Say hello' },
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
