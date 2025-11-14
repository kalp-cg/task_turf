import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react';

// Enhanced Loader Component
export const Loader = ({ 
  size = 'medium', 
  message = 'Loading...', 
  fullscreen = false,
  color = 'orange' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const colorClasses = {
    orange: 'text-[#F4A261]',
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500'
  };

  const LoaderContent = () => (
    <motion.div 
      className={`flex flex-col items-center justify-center ${fullscreen ? 'min-h-screen' : 'py-8'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizeClasses[size]} ${colorClasses[color]} mb-4`}
      >
        <Loader2 className="w-full h-full" />
      </motion.div>
      {message && (
        <p className="text-gray-600 text-center max-w-md">
          {message}
        </p>
      )}
    </motion.div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        <LoaderContent />
      </div>
    );
  }

  return <LoaderContent />;
};

// Skeleton Loader for Cards
export const SkeletonCard = ({ count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
          <div className="w-12 h-12 bg-gray-300 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-5/6"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      ))}
    </>
  );
};

// Loading States for different components
export const LoadingStates = {
  // Button loading state
  ButtonLoader: ({ children, loading, ...props }) => (
    <button {...props} disabled={loading || props.disabled}>
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  ),

  // Page loading overlay
  PageLoader: ({ loading, children }) => (
    <div className="relative">
      {children}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <Loader size="large" message="Loading page..." />
        </div>
      )}
    </div>
  ),

  // Table loading state
  TableLoader: ({ rows = 5, columns = 4 }) => (
    <div className="animate-pulse">
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4 py-4 border-b border-gray-200">
          {[...Array(columns)].map((_, colIndex) => (
            <div key={colIndex} className="flex-1 h-4 bg-gray-300 rounded"></div>
          ))}
        </div>
      ))}
    </div>
  )
};

// Status indicators
export const StatusIndicator = ({ status, message }) => {
  const icons = {
    loading: { icon: Loader2, color: 'text-blue-500', bgColor: 'bg-blue-100', animate: 'animate-spin' },
    success: { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-100' },
    error: { icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-100' },
    warning: { icon: AlertCircle, color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
    info: { icon: Info, color: 'text-blue-500', bgColor: 'bg-blue-100' }
  };

  const config = icons[status] || icons.info;
  const Icon = config.icon;

  return (
    <motion.div 
      className={`flex items-center p-4 rounded-lg ${config.bgColor} border border-opacity-20`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <Icon className={`w-5 h-5 ${config.color} ${config.animate || ''} mr-3 flex-shrink-0`} />
      <span className={`${config.color} font-medium`}>{message}</span>
    </motion.div>
  );
};

// Empty state component
export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  className = "" 
}) => (
  <motion.div 
    className={`text-center py-12 ${className}`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
  >
    {Icon && (
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
    )}
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
    {actionLabel && onAction && (
      <motion.button
        onClick={onAction}
        className="bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {actionLabel}
      </motion.button>
    )}
  </motion.div>
);

// Retry mechanism component
export const RetryWrapper = ({ 
  onRetry, 
  error, 
  loading, 
  children, 
  retryMessage = "Something went wrong. Please try again." 
}) => {
  if (error) {
    return (
      <div className="text-center py-8">
        <StatusIndicator status="error" message={retryMessage} />
        <motion.button
          onClick={onRetry}
          className="mt-4 bg-gradient-to-r from-[#F4A261] to-[#E76F51] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      </div>
    );
  }

  if (loading) {
    return <Loader message="Loading..." />;
  }

  return children;
};

// Progress bar component
export const ProgressBar = ({ 
  progress = 0, 
  showPercentage = true, 
  height = 'h-2',
  color = 'bg-gradient-to-r from-[#F4A261] to-[#E76F51]'
}) => (
  <div className="w-full">
    <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
      <motion.div
        className={`h-full ${color} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
    {showPercentage && (
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
    )}
  </div>
);

// Network status indicator
export const NetworkStatus = () => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      exit={{ y: -50 }}
    >
      <p className="text-sm font-medium">
        You appear to be offline. Some features may not work properly.
      </p>
    </motion.div>
  );
};

export default Loader;