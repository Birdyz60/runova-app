import fs from 'fs';
import path from 'path';

describe('App Icon Integration', () => {
  it('devrait générer les icônes Android et iOS aux bons emplacements', () => {
    const androidIcon = path.resolve(
      __dirname,
      '../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
    );
    const iosIcon = path.resolve(
      __dirname,
      '../../ios/Runova/Images.xcassets/AppIcon.appiconset/icon-60@2x.png',
    );

    expect(fs.existsSync(androidIcon)).toBe(true);
    expect(fs.existsSync(iosIcon)).toBe(true);
  });
});
