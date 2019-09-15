jest.mock('firebase/app', () => {
  const data = { name: 'unnamed' };
  const snapshot = { val: () => data };
  return {
    apps: jest.fn().mockReturnValue({
      length: jest.fn().mockReturnValue(1),
    }),
    initializeApp: jest.fn().mockReturnValue({
      database: jest.fn().mockReturnValue({
        ref: jest.fn().mockReturnThis(),
        once: jest.fn(() => Promise.resolve(snapshot)),
      }),
    }),
  };
});

/* test("getAlbums function returns an array", async () => {
    const data = await MusicService.getAlbums();
    expect(data.constructor).toEqual(Array);
  }); */

export {};
