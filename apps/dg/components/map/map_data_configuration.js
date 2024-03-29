// ==========================================================================
//                      DG.MapDataConfiguration
//
//  Author:   William Finzer
//
//  Copyright ©2014 Concord Consortium
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
// ==========================================================================

sc_require('components/graph_map_common/plot_data_configuration');

/** @class  DG.MapDataConfiguration - The object that describes the manner in which attributes are
    assigned to places in a map.

  @extends DG.PlotDataConfiguration
*/
DG.MapDataConfiguration = DG.PlotDataConfiguration.extend(
/** @scope DG.MapDataConfiguration.prototype */ 
{
  /**
   * It is in initialization that we specialize from base class
   */
  init: function() {

    var attributeDescriptions = {
                                  x: DG.AttributePlacementDescription.create(),
                                  y: DG.AttributePlacementDescription.create(),
                                  legend: DG.AttributePlacementDescription.create()
                                },
        tPlace,
        tDefaults = DG.currDocumentController().collectionDefaults(),
        tCollectionClient = tDefaults && tDefaults.collectionClient,
        tAttrNames = tCollectionClient && tCollectionClient.getAttributeNames(),
        tLatName, tLongName,
        tLatAttr, tLongAttr,
        kLatNames = ['latitude', 'lat', 'Latitude', 'Lat'],
        kLongNames = ['longitude', 'long', 'lng', 'Longitude', 'Long', 'Lng'];

    sc_super();
    
    /**
        Utility function for use in confuguring the attribute descriptions
        @param  {String}    iAttrPrefix -- {'x','y','legend'}
        @param  {String}    iAttrInfix -- {'X','Y','Legend'}
        @param  {Number}    iNumericRole -- Numeric analysis role
        @param  {Number}    iCategoricalRole -- Categorical analysis role
     */
    var configAttrDesc = function( iAttrPrefix, iAttr) {
      var attrDesc = attributeDescriptions[ iAttrPrefix];
          
      DG.assert( attrDesc);
      
      // Configure the attribute description for the specified default attribute
      if( iAttr) {
        // Must set collection before attribute for attribute stats to be configured properly
        attrDesc.set('collectionClient', tCollectionClient);
        attrDesc.set('attribute', iAttr);
        attrDesc.setPath('attributeStats.attributeType', DG.Analysis.EAttributeType.eNumeric);
      }
      // Null out the attribute description when no map attribute is specified.
      else {
        attrDesc.set('collectionClient', null);
        attrDesc.removeAllAttributes();
      }
      
      // We must set these up manually, because the infrastructure isn't in place by
      // the time sc_super() (i.e. SC.Object.init()) is called.
      attrDesc.addObserver('collectionClient', this, iAttrPrefix + 'CollectionDidChange');
    }.bind( this);

    if( tAttrNames) {
      kLatNames.forEach( function( iName) {
        if( tAttrNames.indexOf( iName) >= 0)
          tLatName = iName;
      });
      tLatAttr = tLatName && tCollectionClient.getAttributeByName( tLatName);
      kLongNames.forEach( function( iName) {
        if( tAttrNames.indexOf( iName) >= 0)
          tLongName = iName;
      });
      tLongAttr = tLongName && tCollectionClient.getAttributeByName( tLongName);
    }
    
    configAttrDesc('x', tLongAttr);
    configAttrDesc('y', tLatAttr);
    configAttrDesc('legend', null);

    // Prepare the attributes array. It has as many elements as there are places,
    //  and, initially, those elements are empty arrays.
    this.attributesByPlace = [];
    for( tPlace = 0; tPlace < DG.GraphTypes.EPlace.eNumPlaces; tPlace++)
      this.attributesByPlace[tPlace] = [];
    
    // Actually, during this coding transition, we're going to stash the previously
    // initialized attribute descriptions in attributesByPlace.
    this.attributesByPlace[ DG.GraphTypes.EPlace.eX][0] = attributeDescriptions.x;
    this.attributesByPlace[ DG.GraphTypes.EPlace.eY][0] = attributeDescriptions.y;
    this.attributesByPlace[ DG.GraphTypes.EPlace.eLegend][0] = attributeDescriptions.legend;
  }

});

