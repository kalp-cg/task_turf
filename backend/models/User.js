const { ObjectId } = require('mongodb');

class User {
  constructor(userData) {
    this._id = userData._id || new ObjectId();
    this.email = userData.email;
    this.password = userData.password;
    this.role = userData.role || 'user'; // 'admin', 'worker', 'user'
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.phone = userData.phone;
    this.address = userData.address;
    this.isVerified = userData.isVerified || false;
    this.createdAt = userData.createdAt || new Date();
    this.updatedAt = userData.updatedAt || new Date();

    // Role-specific fields
    if (this.role === 'worker') {
      this.skills = userData.skills || [];
      this.experience = userData.experience || 0;
      this.hourlyRate = userData.hourlyRate || 0;
      this.description = userData.description || '';
      this.rating = userData.rating || 0;
      this.completedJobs = userData.completedJobs || 0;
      this.isAvailable = userData.isAvailable !== undefined ? userData.isAvailable : true;
      this.profileImage = userData.profileImage || '';
    }

    if (this.role === 'admin') {
      this.permissions = userData.permissions || ['all'];
    }
  }

  // Get public profile (hide sensitive data)
  getPublicProfile() {
    const profile = {
      _id: this._id,
      email: this.email,
      role: this.role,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      addresses: this.addresses || [], // Multiple addresses
      isVerified: this.isVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isActive: this.isActive,
      profileImage: this.profileImage || '',
      bio: this.bio || ''
    };

    // Add role-specific fields
    if (this.role === 'worker') {
      profile.skills = this.skills || [];
      profile.experience = this.experience || 0;
      profile.hourlyRate = this.hourlyRate || 0;
      profile.rating = this.rating || 0;
      profile.description = this.description || '';
      profile.completedJobs = this.completedJobs || 0;
      profile.totalEarnings = this.totalEarnings || 0;
      profile.isAvailable = this.isAvailable !== undefined ? this.isAvailable : true;
      profile.workHistory = this.workHistory || [];
      profile.reviews = this.reviews || [];
      profile.specializations = this.specializations || [];
      profile.availability = this.availability || {
        monday: { available: true, hours: '9:00-17:00' },
        tuesday: { available: true, hours: '9:00-17:00' },
        wednesday: { available: true, hours: '9:00-17:00' },
        thursday: { available: true, hours: '9:00-17:00' },
        friday: { available: true, hours: '9:00-17:00' },
        saturday: { available: false, hours: '' },
        sunday: { available: false, hours: '' }
      };
    } else if (this.role === 'admin') {
      profile.permissions = this.permissions || [];
    } else if (this.role === 'user') {
      profile.bookingHistory = this.bookingHistory || [];
      profile.favoriteWorkers = this.favoriteWorkers || [];
      profile.totalSpent = this.totalSpent || 0;
    }

    return profile;
  }

  // Get minimal data for JWT token
  getTokenData() {
    return {
      _id: this._id,
      email: this.email,
      role: this.role,
      firstName: this.firstName,
      lastName: this.lastName
    };
  }

  // Validate user data based on role
  static validateUserData(userData) {
    const errors = [];

    // Common validations
    if (!userData.email) errors.push('Email is required');
    if (!userData.password) errors.push('Password is required');
    if (!userData.firstName) errors.push('First name is required');
    if (!userData.lastName) errors.push('Last name is required');
    if (!userData.role) errors.push('Role is required');
    if (!['admin', 'worker', 'user'].includes(userData.role)) {
      errors.push('Role must be admin, worker, or user');
    }

    // Worker-specific validations
    if (userData.role === 'worker') {
      if (!userData.skills || userData.skills.length === 0) {
        errors.push('Skills are required for workers');
      }
      if (!userData.experience || userData.experience < 0) {
        errors.push('Valid experience is required for workers');
      }
      if (!userData.hourlyRate || userData.hourlyRate <= 0) {
        errors.push('Valid hourly rate is required for workers');
      }
    }

    return errors;
  }
}

module.exports = User;