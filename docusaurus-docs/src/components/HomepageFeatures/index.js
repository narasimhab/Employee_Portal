import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '🚀 Installation',
    link: '/docs/getting-started/installation',
    description: (
      <>Get the frontend, backend, and database running in minutes.</>
    ),
  },
  {
    title: '⚡ Quickstart',
    link: '/docs/getting-started/quickstart',
    description: <>Launch dev servers and log in with demo credentials.</>,
  },
  {
    title: '🧩 Architecture',
    link: '/docs/architecture/overview',
    description: (
      <>Understand how the React SPA, Express API, and MySQL fit together.</>
    ),
  },
  {
    title: '🔌 API Reference',
    link: '/docs/api-reference/introduction',
    description: <>Browse REST endpoints exposed by the backend.</>,
  },
  {
    title: '🛡️ Roles & Permissions',
    link: '/docs/development/roles-and-permissions',
    description: (
      <>Three roles (Admin / Manager / Employee) enforced front and back.</>
    ),
  },
  {
    title: '🗄️ Database',
    link: '/docs/development/database',
    description: <>19 tables, sample data, and migration scripts.</>,
  },
];

function Feature({ title, description, link }) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <Link to={link} className={styles.featureCard}>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
