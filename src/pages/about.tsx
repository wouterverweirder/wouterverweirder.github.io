import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import About from '../containers/about';

type AboutPageProps = {};

const AboutPage: React.FunctionComponent<AboutPageProps> = (props) => {
  return (
    <Layout>
      <SEO
        title="About Wouter"
        description="Wouter Verweirder is a faculty member of the Technical University of West-Flanders (HOWEST). He is also owner of a company called Happy Banana."
      />

      <About />
    </Layout>
  );
};

export default AboutPage;
