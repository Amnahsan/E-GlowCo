import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton, 
  Grid,
  Paper,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const socialPosts = [
  {
    id: 1,
    image: '/images/summer-collection.jpeg',
    caption: 'Discover our new summer skincare collection! ✨ #Beauty #Skincare',
    likes: '2.5K',
    comments: '128',
    username: '@sameglowco'
  },
  {
    id: 2,
    image: '/images/vitamin-C.jpg',
    caption: 'Morning glow with our vitamin C serum 🌟 #GlowingSkin',
    likes: '1.8K',
    comments: '95',
    username: '@sameglowco'
  },
  {
    id: 3,
    image: '/images/self-care.jpg',
    caption: 'Self-care Sunday essentials 💆‍♀️ #SelfCare #BeautyRoutine',
    likes: '3.2K',
    comments: '156',
    username: '@sameglowco'
  },
  {
    id: 4,
    image: '/images/makeup.jpg',
    caption: 'New makeup collection launch! 💄 #MakeupLover',
    likes: '4.1K',
    comments: '203',
    username: '@sameglowco'
  },
  {
    id: 5,
    image: '/images/natural-beauty.jpg',
    caption: 'Natural beauty tips and tricks 🌿 #NaturalBeauty',
    likes: '2.9K',
    comments: '145',
    username: '@sameglowco'
  },
  {
    id: 6,
    image: '/images/bts.jpg',
    caption: 'Behind the scenes at our photo shoot 📸 #BTS',
    likes: '1.7K',
    comments: '89',
    username: '@sameglowco'
  }
];

const SocialFeed = () => {
  return (
    <Box className="py-12 md:py-20 bg-gray-50 w-full">
      <Box className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Box className="text-center mb-12">
            <Box className="flex items-center justify-center gap-2 mb-4">
              <InstagramIcon className="text-4xl text-primary-600 w-10 h-10" />
              <Typography 
                variant="h2" 
                className="text-3xl md:text-4xl font-bold"
              >
                Follow Us on Instagram
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Stay updated with our latest products, beauty tips, and behind-the-scenes moments.
            </Typography>
            <Typography 
              variant="h6" 
              className="text-primary-600 mt-2 font-medium"
            >
              @sameglowco
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, md: 3 }}>
            {socialPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <motion.div variants={itemVariants}>
                  <Paper 
                    className="relative group overflow-hidden rounded-xl"
                    elevation={0}
                  >
                    <Box className="aspect-w-1 aspect-h-1">
                      <img
                        src={post.image}
                        alt={post.caption}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay */}
                      <Box className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                        <Box className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-white">
                          <Typography variant="body1" className="text-center mb-4">
                            {post.caption}
                          </Typography>
                          <Box className="flex gap-4">
                            <Box className="flex items-center w-10 h-10">
                              <FavoriteIcon className="mr-1" />
                              {post.likes}
                            </Box>
                            <Box className="flex items-center w-10 h-10">
                              <ChatBubbleOutlineIcon className="mr-1" />
                              {post.comments}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    {/* Username Badge */}
                    <Box className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                      <Typography variant="caption" className="font-medium">
                        {post.username}
                      </Typography>
                    </Box>

                    {/* Action Buttons */}
                    <Box className="absolute bottom-4 right-4 flex gap-2">
                      <IconButton 
                        className="bg-white hover:bg-gray-100 shadow-sm w-10 h-10"
                        size="small"
                      >
                        <FavoriteIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        className="bg-white hover:bg-gray-100 shadow-sm w-10 h-10"
                        size="small"
                      >
                        <ShareIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box className="text-center mt-12">
            <Button
              variant="outlined"
              startIcon={<InstagramIcon />}
              className="border-primary-600 text-primary-600 hover:bg-primary-50"
              href="https://instagram.com/sameglowco"
              target="_blank"
            >
              Follow Us on Instagram
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default SocialFeed; 