import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Box,
  Card,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PercentIcon from '@mui/icons-material/Percent';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: { duration: 0.2 }
  }
};

function DiscountList({ discounts, onEditDiscount, onDeleteDiscount }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const getStatusColor = (discount) => {
    return discount.status === 'Active' ? 'success' : 'error';
  };

  const getStatusText = (discount) => {
    return discount.status;
  };

  const DiscountCard = ({ discount }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <Card className="mb-4 hover:shadow-md transition-shadow duration-300">
        <Box className="p-4">
          <Box className="flex justify-between items-start mb-3">
            <Box>
              <Typography variant="h6" className="font-semibold text-gray-900">
                {discount.name}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {discount.description}
              </Typography>
            </Box>
            <Chip
              label={getStatusText(discount)}
              color={getStatusColor(discount)}
              size="small"
            />
          </Box>

          <Box className="grid grid-cols-2 gap-4 mb-4">
            <Box className="flex items-center space-x-2">
              <PercentIcon className="text-primary-500" />
              <Box>
                <Typography variant="caption" className="text-gray-500 block">
                  Discount
                </Typography>
                <Typography variant="body2" className="font-medium">
                  {discount.discountPercentage}%
                </Typography>
              </Box>
            </Box>
            <Box className="flex items-center space-x-2">
              <CalendarTodayIcon className="text-primary-500" />
              <Box>
                <Typography variant="caption" className="text-gray-500 block">
                  Duration
                </Typography>
                <Typography variant="body2" className="font-medium">
                  {formatDate(discount.startDate)} - {formatDate(discount.endDate)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className="flex justify-end gap-2">
            <Tooltip title="Edit Discount">
              <IconButton 
                onClick={() => onEditDiscount(discount)}
                className="bg-blue-50 hover:bg-blue-100 text-blue-600 w-8 h-8"
                size="small"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Discount">
              <IconButton 
                onClick={() => onDeleteDiscount(discount._id)}
                className="bg-red-50 hover:bg-red-100 text-red-600 w-8 h-8"
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );

  const DiscountRow = ({ discount }) => (
    <motion.tr
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="hover:bg-gray-50"
    >
      <TableCell>
        <Box>
          <Typography className="font-medium">{discount.name}</Typography>
          <Typography variant="body2" className="text-gray-500">
            {discount.description}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box className="flex items-center space-x-1">
          <PercentIcon className="text-primary-500" fontSize="small" />
          <Typography>{discount.discountPercentage}%</Typography>
        </Box>
      </TableCell>
      <TableCell>{formatDate(discount.startDate)}</TableCell>
      <TableCell>{formatDate(discount.endDate)}</TableCell>
      <TableCell>
        <Chip
          label={getStatusText(discount)}
          color={getStatusColor(discount)}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Box className="flex justify-center gap-1">
          <Tooltip title="Edit Discount">
            <IconButton 
              onClick={() => onEditDiscount(discount)}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 w-8 h-8 p-5 "
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Discount">
            <IconButton 
              onClick={() => onDeleteDiscount(discount._id)}
              className="bg-red-50 hover:bg-red-100 text-red-600 w-8 h-8 p-5"
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </motion.tr>
  );

  if (isMobile) {
    return (
      <Box className="p-4">
        <AnimatePresence>
          {discounts.map((discount) => (
            <DiscountCard key={discount._id} discount={discount} />
          ))}
        </AnimatePresence>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} className="mt-6 rounded-xl shadow-sm">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-50">
            <TableCell className="font-semibold">Discount</TableCell>
            <TableCell className="font-semibold">Percentage</TableCell>
            <TableCell className="font-semibold">Start Date</TableCell>
            <TableCell className="font-semibold">End Date</TableCell>
            <TableCell className="font-semibold">Status</TableCell>
            <TableCell className="font-semibold text-center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <AnimatePresence>
            {discounts.map((discount) => (
              <DiscountRow key={discount._id} discount={discount} />
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DiscountList;
