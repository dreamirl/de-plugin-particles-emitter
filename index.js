import DE from '@dreamirl/dreamengine';
import * as particles from 'pixi-particles';

function ParticlesEmitter( params, emitterConfig, imageNames )
{
  DE.GameObject.call( this, params || {} );
  
  var particlesImages = imageNames.map( imgName => {
    if ( !DE.PIXI.loader.resources[ imgName ]
      || !DE.PIXI.loader.resources[ imgName ].url
      || !DE.PIXI.utils.TextureCache[ DE.PIXI.loader.resources[ imgName ].url ] ) {
      throw new Error( "Try to use an image in the ParticlesEmitter that doesn't exist in the PIXI TextureCache or loader. Make sure it exist and you loaded the image: " + imgName )
    }
    return DE.PIXI.utils.TextureCache[ DE.PIXI.loader.resources[ imgName ].url ];
  } );
  this.emitter = new particles.Emitter( this, particlesImages, emitterConfig );
  
  this.addAutomatism( "upEm", "upEm" );
  this.enable = false;
}

ParticlesEmitter.prototype = new DE.GameObject();
ParticlesEmitter.constructor = ParticlesEmitter;
ParticlesEmitter.supr = DE.GameObject.prototype;

ParticlesEmitter.prototype.upEm = function()
{
  this.emitter.update((DE.Time.timeSinceLastFrameScaled) * 0.001);
};

ParticlesEmitter.prototype.stop = function()
{
  this.enable = false;
  this.emitter.cleanup();
  this.emitter.resetPositionTracking();
};

ParticlesEmitter.prototype.start = function()
{
  this.elapsed = Date.now();
  this.enable = true;
  this.emitter.cleanup();
  this.emitter.resetPositionTracking();
};

export default ParticlesEmitter;
