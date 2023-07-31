import crypto from 'crypto-js';
import User from '../models/User.js'

export default async function hashAndUpdateAllPasswords() {
    throw new Error('This script is not meant to be run');
	/**
	 * WARNING: VERY DANGEROUS SCRIPT THAT WILL DOUBLE HASH THE PASSWORDS
	 *          DO NOT RUN
	 */
    try {
        const cursor = User.find().cursor();
    
        for await (const user of cursor) {
          const hashedPassword = crypto.SHA256(user.password).toString();
          user.password = hashedPassword;
          await user.save();
        }
    
        console.log('Passwords for all users updated successfully.');
      } catch (error) {
        console.error('Error:', error);
      }
  }