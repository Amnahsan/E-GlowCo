import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import TopBar from './components/TopBar';
import SideNav from './components/SideNav';
import OrderList from './components/OrderList';
import OrderFilter from './components/OrderFilter';
import OrderSort from './components/OrderSort';
import OrderStats from './components/OrderStats';
import UpdateOrderStatusDialog from './components/UpdateOrderStatusDialog';
import { 
  fetchOrders, 
  updateOrderStatus, 
  getOrderStats 
} from '../../api/orderService';

const ITEMS_PER_PAGE = 10;

function OrdersPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  useEffect(() => {
    loadOrders();
    loadStats();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const loadStats = async () => {
    try {
      const data = await getOrderStats();
      console.log('Loaded stats:', data);
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  // Filter orders based on status
  const filteredOrders = useMemo(() => {
    return orders.filter(order => 
      filter === 'all' ? true : order.status === filter
    );
  }, [orders, filter]);

  // Sort filtered orders
  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'amountHigh':
        return sorted.sort((a, b) => b.totalAmount - a.totalAmount);
      case 'amountLow':
        return sorted.sort((a, b) => a.totalAmount - b.totalAmount);
      default:
        return sorted;
    }
  }, [filteredOrders, sortBy]);

  // Paginate sorted orders
  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return sortedOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedOrders, page]);

  const handleUpdateStatus = async (orderId, status, comment) => {
    try {
      await updateOrderStatus(orderId, status, comment);
      await Promise.all([loadOrders(), loadStats()]);
      setIsUpdateDialogOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar onMobileMenuToggle={() => setMobileOpen(!mobileOpen)} />
      <SideNav 
        mobileOpen={mobileOpen} 
        onMobileClose={() => setMobileOpen(false)}
      />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '40px' },
          mt: { xs: '56px', sm: '64px' },
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          overflow: 'auto',
          overflowX: 'hidden'
        }}
      >
        <Box sx={{ 
          p: { xs: 2, sm: 3 },
          flexShrink: 0
        }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1"
            sx={{ mb: 3, fontWeight: 500 }}
          >
            Orders
          </Typography>

          {/* Stats Section */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(4, 1fr)'
            },
            gap: 2,
            mb: 3
          }}>
            {stats && <OrderStats stats={stats} />}
          </Box>

          {/* Filter and Sort Controls */}
          <Box sx={{ mb: 2 }}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <OrderFilter 
                  filter={filter}
                  onFilterChange={setFilter}
                />
              </Grid>
              <Grid item>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2
                }}>
                  <Typography variant="body2" color="textSecondary">
                    Showing {paginatedOrders.length} of {filteredOrders.length} orders
                  </Typography>
                  <OrderSort 
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Order List Container */}
        <Box sx={{ 
          px: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 3 },
          flex: 1,
          minHeight: 0,
          width: '100%'
        }}>
          <OrderList 
            orders={paginatedOrders}
            onUpdateStatus={(order) => {
              setSelectedOrder(order);
              setIsUpdateDialogOpen(true);
            }}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            totalPages={Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)}
          />
        </Box>

        {/* Update Status Dialog */}
        <UpdateOrderStatusDialog
          open={isUpdateDialogOpen}
          order={selectedOrder}
          onClose={() => {
            setIsUpdateDialogOpen(false);
            setSelectedOrder(null);
          }}
          onUpdate={handleUpdateStatus}
        />
      </Box>
    </Box>
  );
}

export default OrdersPage; 