var clearText = '123456';

// MD5 Hash
var psd=(require('crypto').createHash('md5').update(clearText).digest('hex'));
// 'e10adc3949ba59abbe56e057f20f883e'
console.log(psd)
// SHA-1 Hash
require('crypto').createHash('sha1').update(clearText).digest('hex');
// '7c4a8d09ca3762af61e59520943dc26494f8941b'