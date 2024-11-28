import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  useTheme,
  useMediaQuery,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductList from './components/ProductList';
import ProductFilter from './components/ProductFilter';
import ProductForm from './components/ProductForm';
import TopBar from './components/TopBar';
import SideNav from './components/SideNav';
import { addProduct, updateProduct, getProductStats, fetchProducts as fetchProductsAPI } from '../../api/productService';
import AddButton from './components/AddButton';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ProductStats from './components/ProductStats';
import ProductSort from './components/ProductSort';

const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'nameAsc':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'nameDesc':
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    case 'priceAsc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'priceDesc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'stockAsc':
      return sortedProducts.sort((a, b) => a.stock - b.stock);
    case 'stockDesc':
      return sortedProducts.sort((a, b) => b.stock - a.stock);
    case 'newest':
      return sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'oldest':
      return sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    default:
      return sortedProducts;
  }
};

function ProductsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openForm, setOpenForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const ITEMS_PER_PAGE = 10;
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStats();
    fetchProducts();
  }, [refreshList]);

  const fetchStats = async () => {
    try {
      const data = await getProductStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching product stats:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await fetchProductsAPI();
      setProducts(data || []);
    } catch (error) {
      console.error('Failed to load products:', error);
      setProducts([]);
    }
  };

  // Filter products based on status
  const filteredAndSortedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    
    // First apply search filter
    let filtered = products.filter(product => {
      const searchLower = search.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    });

    // Then apply status filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter(product => product.status === 'Active');
        break;
      case 'inactive':
        filtered = filtered.filter(product => product.status === 'Inactive');
        break;
      default:
        break;
    }

    // Finally sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'priceHigh':
          return b.price - a.price;
        case 'priceLow':
          return a.price - b.price;
        case 'nameAZ':
          return a.name.localeCompare(b.name);
        case 'nameZA':
          return b.name.localeCompare(a.name);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }, [products, filter, sortBy, search]); // Add search to dependencies

  // Paginate sorted products
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, page, ITEMS_PER_PAGE]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => {
    setOpenForm(false);
    setEditProduct(null);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setOpenForm(true);
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editProduct) {
        await updateProduct(editProduct._id, productData);
      } else {
        await addProduct(productData);
      }
      setRefreshList(prev => !prev);
      handleCloseForm();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar onMobileMenuToggle={handleDrawerToggle} />
      <SideNav 
        mobileOpen={mobileOpen} 
        onMobileClose={handleDrawerToggle}
      />
      
      {/* Main content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '40px' },
          mt: { xs: '56px', sm: '64px' },
          display: 'flex',
          flexDirection: 'column',
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          bgcolor: 'background.default'
        }}
      >
        {/* Header */}
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 1,
            mb: 2
          }}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h1"
              sx={{ fontWeight: 500 }}
            >
              Products
            </Typography>
            <AddButton
              onClick={handleOpenForm}
              label="Add New Product"
            />
          </Box>

          {/* Stats Section */}
          <Box className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <ProductStats stats={stats} />
          </Box>

          {/* Filter and Sort Controls */}
          <Box className="mb-4">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <ProductFilter 
                  filter={filter}
                  onFilterChange={handleFilterChange}
                />
              </Grid>
              <Grid item>
                <Box className="flex justify-between gap-4">
                  <Typography variant="body2" color="textSecondary">
                    Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
                  </Typography>
                  <ProductSort 
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                    search={search}
                    onSearchChange={setSearch}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
        {/* Product List */}
        <Box sx={{ px: 2, flexGrow: 1, overflow: 'auto', bgcolor: 'background.paper' }}>
          <ProductList 
            products={paginatedProducts} 
            refreshTrigger={refreshList} 
            onEditProduct={handleEditProduct}
            sortBy={sortBy}
            filter={filter}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            totalPages={Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)}
            onRefresh={() => setRefreshList(prev => !prev)}
          />
        </Box>

        <ProductForm
          open={openForm}
          handleClose={handleCloseForm}
          onSave={handleSaveProduct}
          editProduct={editProduct}
        />
      </Box>
    </Box>
  );
}

export default ProductsPage; 