import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyImage from '../../components/gatsby-image';
import SocialProfile from '../../components/social-profile/social-profile';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoGithub,
} from 'react-icons/io';
import {
  AboutWrapper,
  AboutImage,
  AboutPageTitle,
  AboutDetails,
  SocialProfiles,
} from './style';

const SocialLinks = [
  {
    icon: <IoLogoInstagram />,
    url: 'https://www.instagram.com/wouterverweirder/',
    tooltip: 'Instagram',
  },
  {
    icon: <IoLogoGithub />,
    url: 'https://github.com/wouterverweirder/',
    tooltip: 'Github',
  },
  {
    icon: <IoLogoTwitter />,
    url: 'https://twitter.com/wouter',
    tooltip: 'Twitter',
  },
  {
    icon: <IoLogoLinkedin />,
    url: 'https://www.linkedin.com/in/aboutwouter/',
    tooltip: 'Linked In',
  },
];

interface AboutProps {}

const About: React.FunctionComponent<AboutProps> = () => {
  const Data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/about.jpg/" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      site {
        siteMetadata {
          author
          about
        }
      }
    }
  `);

  return (
    <AboutWrapper>
      <AboutPageTitle>
        <h2>About Wouter</h2>
      </AboutPageTitle>

      <AboutDetails>
        <p>
        Wouter Verweirder is a faculty member of the Technical University of West-Flanders (HOWEST), where he teaches web & creative development in the "Devine" Bachelor program. In his classes, students learn the basics of programming and advance to larger, experimental projects using javascript, C++, Arduino, ... Hands-on experience is very important and his students get a lot of practical lab sessions as well as real world projects
        </p>
        <p>
          He is also owner of a company called "Happy Banana," where he works on web projects, mobile apps & interactive installations. 
        </p>
        <SocialProfiles>
          <SocialProfile items={SocialLinks} />
        </SocialProfiles>
      </AboutDetails>
    </AboutWrapper>
  );
};

export default About;