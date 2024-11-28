import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Box,
  Typography,
  Tooltip,
  Pagination
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'warning';
    case 'Processing': return 'info';
    case 'Shipped': return 'primary';
    case 'Delivered': return 'success';
    case 'Cancelled': return 'error';
    default: return 'default';
  }
};

const OrderList = ({ 
  orders, 
  onUpdateStatus, 
  page, 
  onPageChange, 
  totalPages 
}) => {
  const OrderRow = ({ order }) => (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="hover:bg-gray-50"
    >
      <TableCell>
        <Typography variant="subtitle2" className="font-medium">
          {order.orderId}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(order.createdAt).toLocaleDateString()}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          {order.customerId.name}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {order.customerId.email}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          ${order.totalAmount.toFixed(2)}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={order.status}
          color={getStatusColor(order.status)}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Box className="flex justify-center gap-2">
          <Tooltip title="Update Status">
            <IconButton
              onClick={() => onUpdateStatus(order)}
              size="small"
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 w-10 h-10"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </motion.tr>
  );

  return (
    <>
      <TableContainer component={Paper} className="rounded-xl shadow-sm">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell className="font-semibold">Order ID</TableCell>
              <TableCell className="font-semibold">Customer</TableCell>
              <TableCell className="font-semibold">Amount</TableCell>
              <TableCell className="font-semibold">Status</TableCell>
              <TableCell className="font-semibold text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {orders.map((order) => (
                <OrderRow key={order._id} order={order} />
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="flex justify-center mt-6">
        <Pagination
          count={totalPages}
          page={page}
          onChange={onPageChange}
          color="primary"
        />
      </Box>
    </>
  );
};

export default OrderList; 