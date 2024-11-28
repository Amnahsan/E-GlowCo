import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Box,
  Chip,
  Alert,
  Tabs,
  Tab,
  Paper,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  CssBaseline,
  Drawer,
  Toolbar
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, PlayArrow, Visibility, ThumbUp, Share } from '@mui/icons-material';
import TopBar from './components/TopBar';
import SideNav from './components/SideNav';
import { videoService } from '../../api/videoService';
import VideoFilter from './components/VideoFilter';
import VideoAnalytics from './components/VideoAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import AddButton from './components/AddButton';
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2
    }
  }
};

const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    category: '',
    tags: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sortBy: 'newest'
  });
  const [analyticsData, setAnalyticsData] = useState({
    views: 0,
    likes: 0,
    shares: 0,
    averageWatchTime: 0,
    viewHistory: [],
    categoryDistribution: []
  });

  useEffect(() => {
    loadVideos();
    loadAnalytics();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const loadVideos = async () => {
    try {
      const data = await videoService.getSellerVideos();
      setVideos(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOpenDialog = (video = null) => {
    if (video) {
      setSelectedVideo(video);
      setFormData({
        title: video.title,
        description: video.description,
        videoUrl: video.videoUrl,
        category: video.category,
        tags: video.tags.join(', ')
      });
    } else {
      setSelectedVideo(null);
      setFormData({
        title: '',
        description: '',
        videoUrl: '',
        category: '',
        tags: ''
      });
    }
    setOpenDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const videoData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      if (selectedVideo) {
        await videoService.updateVideo(selectedVideo._id, videoData);
        setSuccess('Video updated successfully');
      } else {
        await videoService.addVideo(videoData);
        setSuccess('Video added successfully');
      }

      setOpenDialog(false);
      loadVideos();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await videoService.deleteVideo(videoId);
        setSuccess('Video deleted successfully');
        loadVideos();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const getFilteredVideos = () => {
    return videos
      .filter(video => {
        const matchesSearch = video.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          video.description.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category === 'all' || video.category === filters.category;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'oldest':
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 'views':
            return (b.analytics?.views || 0) - (a.analytics?.views || 0);
          case 'title':
            return a.title.localeCompare(b.title);
          case 'newest':
          default:
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
  };

  const loadAnalytics = async () => {
    try {
      const data = await videoService.getVideoAnalytics();
      setAnalyticsData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <TopBar onMobileMenuToggle={handleDrawerToggle} />

      {/* SideNav */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
        >
          <Toolbar />
          <SideNav mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
          open
        >
          <Toolbar />
          <SideNav mobileOpen={false} />
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          marginTop: '64px'
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          
          <motion.div variants={itemVariants}>
            <Box className="flex justify-between items-center mb-6">
              <Typography variant="h4">Tutorial Videos</Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AddButton
                  onClick={() => handleOpenDialog()}
                  label="Add New Video"
                />
              </motion.div>
            </Box>
          </motion.div>

          {/* Analytics Section */}
          <motion.div variants={itemVariants} className="mb-6">
            <VideoAnalytics analytics={analyticsData} />
          </motion.div>

          {/* Alerts */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Alert severity="error" className="mb-4" onClose={() => setError('')}>
                  {error}
                </Alert>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Alert severity="success" className="mb-4" onClose={() => setSuccess('')}>
                  {success}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters */}
          <motion.div variants={itemVariants}>
            <VideoFilter 
              filters={filters}
              onFilterChange={setFilters}
            />
          </motion.div>

          {/* Video Grid */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={3}>
              {getFilteredVideos().map((video) => (
                <Grid item xs={12} md={6} lg={4} key={video._id}>
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    layout
                  >
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {video.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" className="mb-2">
                          {video.description}
                        </Typography>
                        <Box className="mb-2">
                          {video.tags.map((tag, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              style={{ display: 'inline-block' }}
                            >
                              <Chip
                                label={tag}
                                size="small"
                                className="mr-1 mb-1"
                              />
                            </motion.div>
                          ))}
                        </Box>
                        <Typography variant="caption" display="block" gutterBottom>
                          Category: {video.category}
                        </Typography>
                        <Box className="flex justify-between mt-4">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outlined"
                              size="small"
                              href={video.videoUrl}
                              target="_blank"
                            >
                              Watch Video
                            </Button>
                          </motion.div>
                          <Box>
                            <motion.div style={{ display: 'inline-block' }} whileHover={{ scale: 1.1 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleOpenDialog(video)}
                              >
                                <EditIcon />
                              </IconButton>
                            </motion.div>
                            <motion.div style={{ display: 'inline-block' }} whileHover={{ scale: 1.1 }}>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(video._id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </motion.div>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </motion.div>

        {/* Video Form Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <form onSubmit={handleSubmit}>
            <DialogTitle>
              {selectedVideo ? 'Edit Video' : 'Add New Video'}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} className="pt-2">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    multiline
                    rows={3}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Video URL"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <MenuItem value="Tutorial">Tutorial</MenuItem>
                      <MenuItem value="Product Demo">Product Demo</MenuItem>
                      <MenuItem value="How-to Guide">How-to Guide</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tags (comma-separated)"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    helperText="Enter tags separated by commas"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button type="submit" variant="contained">
                {selectedVideo ? 'Update' : 'Add'} Video
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Box>
  );
};

export default VideoManagement; 