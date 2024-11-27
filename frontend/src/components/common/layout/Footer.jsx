import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  IconButton, 
  TextField, 
  Button,
  Divider,
  Link as MuiLink
} from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const footerLinks = {
    'Quick Links': [
      { name: 'Home', path: '/' },
      { name: 'Shop', path: '/shop' },
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' }
    ],
    'Customer Service': [
      { name: 'Shipping Policy', path: '/shipping' },
      { name: 'Returns & Exchanges', path: '/returns' },
      { name: 'FAQs', path: '/faqs' },
      { name: 'Track Order', path: '/track-order' }
    ],
    'Legal': [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' }
    ]
  };

  const socialLinks = [
    { icon: <FacebookIcon />, url: '#', name: 'Facebook' },
    { icon: <InstagramIcon />, url: '#', name: 'Instagram' },
    { icon: <TwitterIcon />, url: '#', name: 'Twitter' },
    { icon: <YouTubeIcon />, url: '#', name: 'YouTube' }
  ];

  return (
    <Box className="bg-gray-900 text-white pt-12 md:pt-16 pb-8 w-full">
      <Box className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand and Description */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" className="font-bold mb-4">
                SAM E-GlowCo
              </Typography>
              <Typography variant="body2" className="text-gray-400 mb-6">
                Your one-stop destination for premium beauty and skincare products. 
                We believe in enhancing natural beauty through quality products.
              </Typography>

              <Box className="flex items-center space-x-2 text-gray-400 mb-2">
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">
                  123 Beauty Street, Makeup City, MC 12345
                </Typography>
              </Box>
              <Box className="flex items-center space-x-2 text-gray-400 mb-2">
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">+1 (234) 567-8900</Typography>
              </Box>
              <Box className="flex items-center space-x-2 text-gray-400">
                <EmailIcon fontSize="small" />
                <Typography variant="body2">contact@eglowco.com</Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <Grid item xs={12} sm={6} md={2} key={title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Typography variant="subtitle1" className="font-semibold mb-4">
                  {title}
                </Typography>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.path}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Grid>
          ))}

          {/* Social Links */}
          <Grid item xs={12} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Typography variant="subtitle1" className="font-semibold mb-4">
                Follow Us
              </Typography>
              <Box className="flex space-x-2">
                {socialLinks.map((social) => (
                  <IconButton 
                    key={social.name}
                    component={MuiLink}
                    href={social.url}
                    target="_blank"
                    className="text-gray-400 hover:text-white"
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider className="my-8 border-gray-800" />

        {/* Bottom Section */}
        <Box className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <Typography variant="body2">
            © 2024 SAM E-GlowCo. All rights reserved.
          </Typography>
          <Box className="flex mt-4 md:mt-0">
            <Typography variant="body2" className="text-center">
              Created by: Samra Saleem | Muskan Tariq | Amna Hassan
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer; 