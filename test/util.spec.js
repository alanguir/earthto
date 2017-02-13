var util = require('../util.js');

var should = require('chai').should();

describe('degrees to radians', function(){
  it('should convert degrees to radians', function(){
    util.degToRad(720).should.eql(Math.PI*4);
    util.degToRad(360).should.eql(Math.PI*2);
    util.degToRad(180).should.eql(Math.PI);
    util.degToRad(90).should.eql(Math.PI/2);
  });
});

describe('opposite side', function(){
  it('should find the opposing side of right unit triangel', function(){
    util.opposite(Math.sqrt(2), 45).should.eql(1);
    util.opposite(Math.sqrt(2) * 4, 45).should.eql(4);
  });
});

describe('coords', function(){
  it('should calculate level pos and neg', function(){
    util.coords(10, 0).should.eql([10, 0]);
    util.coords(10, 180).should.eql([-10, 0]);
  })

  it('should calculate vertical pos and neg', function(){
    util.coords(10, 90).should.eql([0, 10]);
    util.coords(10, 270).should.eql([0, -10]);
  })

  it('should calculate 45 degrees', function(){
    util.coords(Math.sqrt(2), 45).should.eql([1, 1]);

    var threeEigths = util.coords(Math.sqrt(2), 135);
    threeEigths[0].should.eql(-1);
    threeEigths[1].should.be.closeTo(1, 0.00000001);
  })
});

describe('distance', function(){
  it('should find distance from opposite points on unit circle', function(){
    util.distance([1, 1], [-1, -1]).should.eql(Math.sqrt(2) * 2);
  })

  it('should find distance with quadgrant', function(){
    util.distance([3, 2], [8, 2]).should.eql(5);
  })
})
