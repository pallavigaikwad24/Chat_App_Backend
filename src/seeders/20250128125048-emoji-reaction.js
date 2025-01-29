'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const reactions = [
      { code: '1F44D', name: 'Like' },
      { code: '1F602', name: 'Laugh' },
      { code: '1F60D', name: 'Love' },
      { code: '1F622', name: 'Sad' },
      { code: '1F621', name: 'Angry' }
    ];

    // Check if records already exist to prevent duplicates
    const existingReactions = await queryInterface.sequelize.query(
      `SELECT code FROM "EmojiModels" WHERE code IN (${reactions.map(r => `'${r.code}'`).join(", ")})`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Add timestamps to reactions
    const timestamp = new Date();
    const reactionsWithTimestamps = reactions.map(reaction => ({
      ...reaction,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    const existingEmojis = existingReactions.map(r => r.code);

    const newReactions = reactionsWithTimestamps.filter(r => !existingEmojis.includes(r.code));

    if (newReactions.length > 0) {
      await queryInterface.bulkInsert('EmojiModels', newReactions);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('EmojiModels', {
      code: [
        '1F44D',
        '1F602',
        '1F60D',
        '1F622',
        '1F621'
      ]
    });
  }
};
