import React from 'react';
import { Grid, Typography, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const cardVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const MetricCard = ({ icon: Icon, title, value, trend, info }) => (
  <motion.div
    variants={cardVariants}
    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-primary-50 text-primary-600`}>
            <Icon />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <Typography variant="subtitle2" className="text-gray-600 font-medium">
                {title}
              </Typography>
              {info && (
                <Tooltip title={info}>
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" className="text-gray-400" />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>

      <Typography variant="h4" className="font-semibold text-gray-900 mb-2">
        {value}
      </Typography>

      <div className="flex items-center space-x-2">
        <TrendingUpIcon className="text-green-500" fontSize="small" />
        <Typography variant="body2" className="text-green-600 font-medium">
          {trend}
        </Typography>
      </div>
    </div>
  </motion.div>
);

function MetricsOverview() {
  const metrics = [
    {
      icon: LocalOfferIcon,
      title: 'Total Products',
      value: '124',
      trend: '+12% this month',
      info: 'Total number of active products in your store'
    },
    {
      icon: ShoppingCartIcon,
      title: 'Total Orders',
      value: '45',
      trend: '+23% this week',
      info: 'Number of orders received'
    },
    {
      icon: AttachMoneyIcon,
      title: 'Revenue',
      value: '$12,456',
      trend: '+18% this month',
      info: 'Total revenue generated from sales'
    },
    {
      icon: LocalOfferIcon,
      title: 'Active Discounts',
      value: '8',
      trend: '+5 this week',
      info: 'Number of active discount campaigns'
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MetricCard {...metric} />
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
}

export default MetricsOverview; 