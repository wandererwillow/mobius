//
// Mobius Data Structure definition
// Not open to editing by module developer
//
var counter = 0; var guids = [];
// Main mObj Class definition
// mObj maybe geometry, ifcModel, data / charts etc
var mObj = function mObj( type ){
	
    var type = type;
	
    this.is_mObj = true; 

    var id = counter++ + guid(); guids.push(this);
    var equivalent = []; 

    // code from http://stackoverflow.com/questions/2020670/javascript-object-id
    function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

	this.getType = function(){
		return type;
	}

    this.getID = function(){
        return id;
    }

    this.getEquivalent = function(){
        return equivalent;
    }

    this.setEquivalent = function( object ){
        equivalent.push( object )
    }

}

var mObj_frame = function mObj_frame( origin, xaxis, yaxis, zaxis ){

    mObj.call(this, 'frame');

    // compute missing axes - follow cylic order to maintain consistency
    if( xaxis == undefined )
        xaxis = verb.core.Vec.cross( yaxis, zaxis );
    else if( yaxis == undefined )
        yaxis = verb.core.Vec.cross( zaxis, xaxis );
    else if( zaxis == undefined )
        zaxis = verb.core.Vec.cross( xaxis, yaxis );

    // creating unit vectors
    var _xaxis = verb.core.Vec.normalized( xaxis ); 
    var _yaxis = verb.core.Vec.normalized( yaxis ); 
    var _zaxis = verb.core.Vec.normalized( zaxis ); 

    function invertMatrix(m) {
          
          var r = [16]; 

          r[0] = m[1][1]*m[2][2]*m[3][3] - m[1][1]*m[3][2]*m[2][3] - m[1][2]*m[2][1]*m[3][3] + m[1][2]*m[3][1]*m[2][3] + m[1][3]*m[2][1]*m[3][2] - m[1][3]*m[3][1]*m[2][2];
          r[1] = -m[0][1]*m[2][2]*m[3][3] + m[0][1]*m[3][2]*m[2][3] + m[0][2]*m[2][1]*m[3][3] - m[0][2]*m[3][1]*m[2][3] - m[0][3]*m[2][1]*m[3][2] + m[0][3]*m[3][1]*m[2][2];
          r[2] = m[0][1]*m[1][2]*m[3][3] - m[0][1]*m[3][2]*m[1][3] - m[0][2]*m[1][1]*m[3][3] + m[0][2]*m[3][1]*m[1][3] + m[0][3]*m[1][1]*m[3][2] - m[0][3]*m[3][1]*m[1][2] ;
          r[3] = -m[0][1]*m[1][2]*m[2][3] + m[0][1]*m[2][2]*m[1][3] + m[0][2]*m[1][1]*m[2][3] - m[0][2]*m[2][1]*m[1][3] - m[0][3]*m[1][1]*m[2][2] + m[0][3]*m[2][1]*m[1][2] ;

          r[4] = -m[1][0]*m[2][2]*m[3][3] + m[1][0]*m[3][2]*m[2][3] + m[1][2]*m[2][0]*m[3][3] - m[1][2]*m[3][0]*m[2][3] - m[1][3]*m[2][0]*m[3][2] + m[1][3]*m[3][0]*m[2][2];
          r[5] = m[0][0]*m[2][2]*m[3][3] - m[0][0]*m[3][2]*m[2][3] - m[0][2]*m[2][0]*m[3][3] + m[0][2]*m[3][0]*m[2][3] + m[0][3]*m[2][0]*m[3][2] - m[0][3]*m[3][0]*m[2][2];
          r[6] = -m[0][0]*m[1][2]*m[3][3] + m[0][0]*m[3][2]*m[1][3] + m[0][2]*m[1][0]*m[3][3] - m[0][2]*m[3][0]*m[1][3] - m[0][3]*m[1][0]*m[3][2] + m[0][3]*m[3][0]*m[1][2] ;
          r[7] = m[0][0]*m[1][2]*m[2][3] - m[0][0]*m[2][2]*m[1][3] - m[0][2]*m[1][0]*m[2][3] + m[0][2]*m[2][0]*m[1][3] + m[0][3]*m[1][0]*m[2][2] - m[0][3]*m[2][0]*m[1][2] ;

          r[8] = m[1][0]*m[2][1]*m[3][3] - m[1][0]*m[3][1]*m[2][3] - m[1][1]*m[2][0]*m[3][3] + m[1][1]*m[3][0]*m[2][3] + m[1][3]*m[2][0]*m[3][1] - m[1][3]*m[3][0]*m[2][1] ;
          r[9] = -m[0][0]*m[2][1]*m[3][3] + m[0][0]*m[3][1]*m[2][3] + m[0][1]*m[2][0]*m[3][3] - m[0][1]*m[3][0]*m[2][3] - m[0][3]*m[2][0]*m[3][1] + m[0][3]*m[3][0]*m[2][1] ;
          r[10] = m[0][0]*m[1][1]*m[3][3] - m[0][0]*m[3][1]*m[1][3] - m[0][1]*m[1][0]*m[3][3] + m[0][1]*m[3][0]*m[1][3] + m[0][3]*m[1][0]*m[3][1] - m[0][3]*m[3][0]*m[1][1] ;
          r[11] = -m[0][0]*m[1][1]*m[2][3] + m[0][0]*m[2][1]*m[1][3] + m[0][1]*m[1][0]*m[2][3] - m[0][1]*m[2][0]*m[1][3] - m[0][3]*m[1][0]*m[2][1] + m[0][3]*m[2][0]*m[1][1] ;

          r[12] = -m[1][0]*m[2][1]*m[3][2] + m[1][0]*m[3][1]*m[2][2] + m[1][1]*m[2][0]*m[3][2] - m[1][1]*m[3][0]*m[2][2] - m[1][2]*m[2][0]*m[3][1] + m[1][2]*m[3][0]*m[2][1] ;
          r[13] = m[0][0]*m[2][1]*m[3][2] - m[0][0]*m[3][1]*m[2][2] - m[0][1]*m[2][0]*m[3][2] + m[0][1]*m[3][0]*m[2][2] + m[0][2]*m[2][0]*m[3][1] - m[0][2]*m[3][0]*m[2][1] ;
          r[14] = -m[0][0]*m[1][1]*m[3][2] + m[0][0]*m[3][1]*m[1][2] + m[0][1]*m[1][0]*m[3][2] - m[0][1]*m[3][0]*m[1][2] - m[0][2]*m[1][0]*m[3][1] + m[0][2]*m[3][0]*m[1][1] ;
          r[15] = m[0][0]*m[1][1]*m[2][2] - m[0][0]*m[2][1]*m[1][2] - m[0][1]*m[1][0]*m[2][2] + m[0][1]*m[2][0]*m[1][2] + m[0][2]*m[1][0]*m[2][1] - m[0][2]*m[2][0]*m[1][1] ;

          var det = m[0][0]*r[0] + m[0][1]*r[4] + m[0][2]*r[8] + m[0][3]*r[12];
          for (var i = 0; i < 16; i++) r[i] /= det;
          
          return [ [ r[0], r[1], r[2], r[3]],
                        [ r[4], r[5], r[6], r[7]],
                            [ r[8], r[9], r[10], r[11]],
                                [ r[12], r[13], r[14], r[15] ]
                    ];
    };


    // compute translation
    var mat_trans = [ [ 1, 0, 0, -origin[0] ],
                        [ 0, 1, 0, -origin[1] ],
                            [ 0, 0, 1, -origin[2] ],
                                [ 0, 0, 0, 1 ]
      
                        ]; 

    var mat_trans_inv = [ [ 1, 0, 0, origin[0] ],
                            [ 0, 1, 0, origin[1] ],
                                [ 0, 0, 1, origin[2] ],
                                    [ 0, 0, 0, 1 ]
                    ]; 

    var world_space_matrix = [ [ _xaxis[0], _xaxis[1], _xaxis[2], 0], 
                                  [ _yaxis[0], _yaxis[1], _yaxis[2], 0], 
                                    [ _zaxis[0], _zaxis[1], _zaxis[2], 0],
                                      [ 0, 0, 0, 1 ] ]
    
    world_space_matrix = verb.core.Mat.mult(world_space_matrix, mat_trans);
    
    var local_space_matrix = invertMatrix( world_space_matrix );


                        
    var planes = { 'xy' : {'a': _zaxis[0], 'b': _zaxis[1], 'c': _zaxis[2], 'd':_zaxis[0]*origin[0] + _zaxis[1]*origin[1] + _zaxis[2]*origin[2] }, 
                        'yz' : {'a': _xaxis[0], 'b': _xaxis[1], 'c': _xaxis[2], 'd':_xaxis[0]*origin[0] + _xaxis[1]*origin[1] + _xaxis[2]*origin[2] },
                            'zx' : {'a': _yaxis[0], 'b': _yaxis[1], 'c': _yaxis[2], 'd':_yaxis[0]*origin[0] + _yaxis[1]*origin[1] + _yaxis[2]*origin[2] }
    }  




    this.toLocal = function( ){ 
       return local_space_matrix; 
    }

    this.toGlobal = function(){
        return world_space_matrix;
    }

    this.getPlane = function(id){
        return planes[id];
    }

    this.getOrigin = function(){
        return origin;
    }

    this.getXaxis = function(){
        return _xaxis;
    }

    this.getYaxis = function(){
        return _yaxis;
    }

    this.getZaxis = function(){
        return _zaxis;
    }

    this.extractThreeGeometry = function(){

        function buildAxis( src, dst, colorHex, dashed ) {
            var geom = new THREE.Geometry(),
                mat; 

            if(dashed) {
                    mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
            } else {
                    mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
            }

            geom.vertices.push( src.clone() );
            geom.vertices.push( dst.clone() ); 
            geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

            var axis = new THREE.Line( geom, mat, THREE.LineSegments );

            return axis;

        }

        function buildAxes( length ) {
            var axes = new THREE.Object3D();
            
            axes.is_mObj = true;

            var or = new THREE.Vector3( origin[0], origin[1], origin[2] )
            var pos_x = new THREE.Vector3( origin[0] + length*_xaxis[0],  origin[1]+length*_xaxis[1],  origin[2]+length*_xaxis[2] );
            var neg_x = new THREE.Vector3( origin[0] - length*_xaxis[0],  origin[1]-length*_xaxis[1],  origin[2]-length*_xaxis[2] );
            var pos_y = new THREE.Vector3( origin[0] + length*_yaxis[0],  origin[1]+length*_yaxis[1],  origin[2]+length*_yaxis[2] );
            var neg_y = new THREE.Vector3( origin[0] - length*_yaxis[0],  origin[1]-length*_yaxis[1],  origin[2]-length*_yaxis[2] );
            var pos_z = new THREE.Vector3( origin[0] + length*_zaxis[0],  origin[1]+length*_zaxis[1],  origin[2]+length*_zaxis[2] );
            var neg_z = new THREE.Vector3( origin[0] - length*_zaxis[0],  origin[1]-length*_zaxis[1],  origin[2]-length*_zaxis[2] );

            axes.add( buildAxis( or, pos_x, 0x990000, false ) ); // +X
            axes.add( buildAxis( or, neg_x, 0x990000, true ) ); // -X
            axes.add( buildAxis( or, pos_y, 0x009900, false ) ); // +Y
            axes.add( buildAxis( or, neg_y, 0x009900, true ) ); // -Y
            axes.add( buildAxis( or, pos_z, 0x0000CC, false ) ); // +Z
            axes.add( buildAxis( or, neg_z, 0x0000CC, true ) ); // -Z

            return axes;

        }

        return buildAxes( 20 );
    }

    this.extractTopology = function(){
        return null;
    }

    this.extractData = function(){
        return 'frame';
    }

}

// mObj Geometry Class
// geometry is stored in geometry format native to module
var mObj_geom = function mObj_geom( geometry, material ){
	
	mObj.call(this, 'geometry');

	var geometry = geometry; 
    var material = material;

    var self = this;

    var data = undefined;
    var topology = undefined;

    var threeGeometry, threeTopology;

    //
    // update function when some property of the object changes
    //
    var update = function(){
        threeGeometry = undefined;
        threeTopology = undefined;
    }

    //
    // get & set functions
    //
    this.getGeometry = function(){
        return geometry;
    }

    this.setGeometry = function( new_geometry ){
        geometry = new_geometry;
        update( true );
    }

    this.getTopology = function(){
        if(topology == undefined)
            topology = computeTopology( self );       
        return topology;
    }
    
    this.getData = function(){
        return data;
    }
    
    this.setData = function( new_data ){
        data = new_data;
    }

    this.getMaterial = function(){
        return material;
    }

    this.setMaterial = function( new_material ){

        material = new_material;
        if( threeGeometry )
            threeGeometry.material = new_material;
        else
            update();
        console.log("Material updated");
    }

    // Dynamic Topology !
   for(var property in TOPOLOGY_DEF){
       
        var propFunc = new Function( 'return this.getTopology()["' + property + '"];' );
       
        Object.defineProperty(this, property,  {
                get: propFunc,
                set: undefined
        });
   }



    //
    // Functions used by Mobius or Module for the different viewers
    //

    //
    // Converts the geometry of the MobiusDataObject - to three.js Mesh by calling a bridging function 'convertGeomtoThreeMesh' in the module
    //
    this.extractThreeGeometry = function(){

        // if threeGeometry hasn't been computed before or native geometry has been transformed so that new conversion is required
        // the function defines it and caches it
        if( threeGeometry == undefined ){
           
            // means it is a solid 
            if( geometry instanceof Array && (geometry[0] instanceof mObj_geom_Surface)){
                var threeGeometry = new THREE.Object3D(); 
                for(var srf=0; srf < geometry.length; srf++){
                    var geom = geometry[srf];
                    var exGeom = geom.extractThreeGeometry();
                    if(material)
                        exGeom.material = material;
                    threeGeometry.add( exGeom ); 
                } 
            }else{
                threeGeometry = convertGeomToThree( geometry );  // calls a function in the module to convert native geom into accepted three format
                if(material)
                    threeGeometry.material = material;
            }
                
        }
			 

        // if material has been assigned to this data object, assigns the same material to the converted geometry
        threeGeometry.is_mObj = true;

        return threeGeometry;
    }


    //
    // Converts the topology defined in native elements to three.js format
    this.extractTopology = function(){

        // if threeGeometry hasn't been computed before or native geometry has been transformed so that new conversion is required
        // the function defines it and caches it
        if(topology == undefined)
            topology = computeTopology(self);

        if( threeTopology == undefined )
             threeTopology = convertTopoToThree( topology );  // calls a function in the module to convert native geom into accepted three format

        threeTopology.is_mObj = true;

        /*
         * Add topology labels as sprite objects - should be according to parameter passed to extractTopology? 
         */
        var displayOption = 0; // 0->For all; 1->For Faces; 2->For Edges; 3->For Vertices (could also distinguish with colors)


        var vGroup = new THREE.Group();
        var eGroup = new THREE.Group(); 
        var fGroup = new THREE.Group();
        for( var childNo=0; childNo < threeTopology.children.length; childNo++ ){

            var child = threeTopology.children[ childNo ];

            if(child instanceof THREE.Points ){

                for( var p=0; p < child.geometry.vertices.length; p++){

                    var vNo = makeTextSprite( p, 
                    { fontsize: 1024, fontface: "Arial", borderColor: {r:0, g:0, b:255, a:1.0},
                        textColor: {r:0, g:0, b:255, a:1.0} } );
                    vNo.position.set(  child.geometry.vertices[p].x, 
                                            child.geometry.vertices[p].y, 
                                                child.geometry.vertices[p].z );
                    vGroup.add( vNo );
                }
            }
            else if(child instanceof THREE.Line){
                //console.log("This is edge ", eGroup.children.length);
                //add edge sprite
                var edgeNo =  makeTextSprite( eGroup.children.length, 
                    { fontsize: 1024, fontface: "Arial", borderColor: {r:0, g:0, b:255, a:1.0},
                        textColor: {r:0, g:255, b:0, a:1.0} } );
                edgeNo.position.set(  0.5*(child.geometry.vertices[0].x + child.geometry.vertices[1].x), 
                                        0.5*(child.geometry.vertices[0].y + child.geometry.vertices[1].y), 
                                            0.5*(child.geometry.vertices[0].z + child.geometry.vertices[1].z) );
                eGroup.add( edgeNo );
            }
            else if(child instanceof THREE.Mesh){
                var faceNo = makeTextSprite( fGroup.children.length, 
                    { fontsize: 1024, fontface: "Arial", borderColor: {r:0, g:0, b:255, a:1.0},
                        textColor: {r:255, g:0, b:0, a:1.0} } );
               
                
                // calculate the midpoint of the surface and position the sprite
                child.geometry.computeBoundingBox();
                boundingBox = child.geometry.boundingBox; 

                var x0 = boundingBox.min.x;
                var x1 = boundingBox.max.x;
                var y0 = boundingBox.min.y;
                var y1 = boundingBox.max.y;
                var z0 = boundingBox.min.z;
                var z1 = boundingBox.max.z;


                var bWidth = ( x0 > x1 ) ? x0 - x1 : x1 - x0;
                var bHeight = ( y0 > y1 ) ? y0 - y1 : y1 - y0;
                var bDepth = ( z0 > z1 ) ? z0 - z1 : z1 - z0;

                var centroidX = x0 + ( bWidth / 2 ) + child.position.x;
                var centroidY = y0 + ( bHeight / 2 )+ child.position.y;
                var centroidZ = z0 + ( bDepth / 2 ) + child.position.z;

                // has to be moved out in the direction of normal
                child.geometry.centroid = new THREE.Vector3(centroidX, 
                                                            centroidY, 
                                                            centroidZ);

                faceNo.position.set(child.geometry.centroid.x,child.geometry.centroid.y,child.geometry.centroid.z);

                fGroup.add( faceNo );
            }
        }

        threeTopology.add(vGroup);
        threeTopology.add(eGroup);
        threeTopology.add(fGroup);

        return threeTopology;
    }

    //
    // Extracts data at MobiusDataObject level and topology level, converts it into a JSON object and returns it to the calling function
    // Doesnot require any bridging functions from the module
    //
    this.extractData = function(){

        var dataTables = [];

        // LIMITATION - Data can only be added to the topology
        if( topology == undefined && data == undefined )
            return dataTables;
        else{
            if (data != undefined){

                // object table
                var objectTable = {}
                objectTable.name = 'ObjectTable';
                objectTable.propertyNames = [];
                objectTable.rows = [];

                var newrow = {};
                newrow.index = 'Object UID'
                newrow.content = [];

                for(var property in data){
                    objectTable.propertyNames.push( property );
                    newrow.content.push(data[property]);
                }

                objectTable.rows.push( newrow );

                dataTables.push( objectTable );
            }

            // generalized - irrespective of topology object configuration
            for(topoElement in topology){

                if(topology.hasOwnProperty(topoElement)){
                    
                    var topoTable = {};
                    topoTable.name = topoElement;
                    topoTable.propertyNames = [];
                    topoTable.rows = [];

                    for( var index=0; index < topology[topoElement].length; index++){ 

                        // each index has a row
                        var newrow = {}
                        newrow.index = index;
                        newrow.content = [];

                        var topoData = topology[topoElement][index].getData(); 

                        if (topoData != undefined){
                            for (var property in topoData ){

                                if( topoTable.propertyNames.indexOf(property) == -1 )
                                    topoTable.propertyNames.push(property);

                                newrow.content[topoTable.propertyNames.indexOf(property)] = topoData[property];
                            }
                        }

                        topoTable.rows.push( newrow );
                    }

                    dataTables.push( topoTable );
                }
            } 
        }
        return dataTables;
    }

    //
    // coverts to various file formats from the three geometry
    //
    this.exportGeometry = function( format ){
        
        var convertedFile; 

        // conversion to obj file format
        if( format == "obj" ){

            if(threeGeometry == undefined)
                threeGeometry = this.extractThreeGeometry();

            var exporter = new THREE.OBJExporter();
            convertedFile = exporter.parse( threeGeometry );
            console.log("converting to obj", convertedFile);

        }

        return convertedFile; 

    };


    // topology is always computed 
    update();
	
}

var mObj_geom_Vertex = function mObj_geom_Vertex( geometry ){

    var defaultVertexMaterial = new THREE.PointsMaterial( { size: 5, sizeAttenuation: false } );
    //console.log(geometry);
    mObj_geom.call( this, geometry, defaultVertexMaterial  ); 

    this.x = geometry[0];
    this.y = geometry[1];
    this.z = geometry[2];
}
 
var mObj_geom_Curve = function mObj_geom_Curve( geometry ){
    
    var defaultCurveMaterial = new THREE.LineBasicMaterial({
    side: THREE.DoubleSide,
    linewidth: 100,
    color: 0x003399
    });
	
    mObj_geom.call( this, geometry, defaultCurveMaterial  ); 
	
}

var mObj_geom_Surface = function mObj_geom_Surface( geometry ){
	
    var defaultSurfaceMaterial = new THREE.MeshLambertMaterial( {
    side: THREE.DoubleSide,
    wireframe: false,
    shading: THREE.SmoothShading,
    transparent: false,
    color: 0x003399
    } );

	mObj_geom.call( this, geometry, defaultSurfaceMaterial  );

}

var mObj_geom_Solid = function mObj_geom_Solid( geometry){
	
    var defaultSolidMaterial = new THREE.MeshLambertMaterial( {
    side: THREE.DoubleSide,
    wireframe: false,
    shading: THREE.SmoothShading,
    transparent: false,
    color: 0xCC6600
    } );

	mObj_geom.call( this, geometry, defaultSolidMaterial );

}



function makeTextSprite( message, parameters )
{
    if ( parameters === undefined ) parameters = {};
    
    var fontface = parameters.hasOwnProperty("fontface") ? 
        parameters["fontface"] : "Arial";
    
    var fontsize = parameters.hasOwnProperty("fontsize") ? 
        parameters["fontsize"] : 18;

    var textColor = parameters.hasOwnProperty("textColor") ?
        parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };
    
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
        parameters["borderThickness"] : 1;
    
    var borderColor = parameters.hasOwnProperty("borderColor") ?
        parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
    
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
        parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

    //var spriteAlignment = THREE.SpriteAlignment.topLeft;

       
    var canvas = document.createElement('canvas'); 
    canvas.class = 'topo-label';
    canvas.width = 2048;
    canvas.height = 2048;
    var context = canvas.getContext('2d'); //console.log(canvas);
    context.font = "Bold " + fontsize + "px " + fontface;
    
    // get size data (height depends only on font size)
    var metrics = context.measureText( message );
    var textWidth = metrics.width;
    
    // background color
    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                                  + backgroundColor.b + "," + backgroundColor.a + ")";
    // border color
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                                  + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    //roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
    // 1.4 is extra height factor for text below baseline: g,j,p,q.
    
    // text color
    context.fillStyle = "rgba(" + textColor.r + "," + textColor.g + ","
                                  + textColor.b + "," + textColor.a + ")";

    context.fillText( message, borderThickness, fontsize + borderThickness);
    
    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas) 
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial( 
        { map: texture/*, useScreenCoordinates: false*/ } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(4.0,2.0,10.0);
    return sprite;  
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) 
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();   
}
