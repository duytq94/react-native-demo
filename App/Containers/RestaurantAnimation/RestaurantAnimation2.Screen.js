import React, {Component} from 'react'
import {
  Animated,
  BackHandler,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import styles from './RestaurantAnimation2.Style'
import images from '../../Themes/Images'

export default class RestaurantAnimation2Screen extends Component {
  constructor(props) {
    super(props);
    this.backPress = this.handleBackPress.bind(this);

    this.timeDilation = this.props.navigation.state.params.timeDilation;

    this.state = {
      whichPlate: 0,
      isBtnPlatePress: false,
      countQuantity: 0,
      shouldShowIndicator: false,
    };

    // Animation phrase 1 (push up plates and menu)
    this.moveTabIndicator = new Animated.Value(0);
    this.zoomTabIndicator = new Animated.Value(0);
    this.tweenColorTabIndicator = new Animated.Value(0);

    this.comeUpPlate1 = new Animated.Value(10);
    this.comeUpPlate2 = new Animated.Value(20);
    this.comeUpPlate3 = new Animated.Value(15);

    this.comeUpIconBottomMenu1 = new Animated.Value(0);
    this.comeUpIconBottomMenu2 = new Animated.Value(0);
    this.comeUpIconBottomMenu3 = new Animated.Value(0);
    this.comeUpIconBottomMenu4 = new Animated.Value(0);
    this.comeUpIconBottomMenu5 = new Animated.Value(0);

    this.comeUpTextBottomMenu = new Animated.Value(-10);
    this.fadeInTextBottomMenu = new Animated.Value(0);

    // Animation phrase 2 (zoom plate when press)
    this.fadeInWhitePlate = new Animated.Value(0);
    this.zoomPlate = new Animated.Value(0);

  }

  doFirstAnimation(posXIconSeat, posXIconMenu) {
    this.moveTabIndicator.setValue(posXIconSeat - 20);
    this.zoomTabIndicator.setValue(0);

    this.comeUpPlate1.setValue(10);
    this.comeUpPlate2.setValue(20);
    this.comeUpPlate3.setValue(15);

    this.comeUpIconBottomMenu1.setValue(0);
    this.comeUpIconBottomMenu2.setValue(0);
    this.comeUpIconBottomMenu3.setValue(0);
    this.comeUpIconBottomMenu4.setValue(0);
    this.comeUpIconBottomMenu5.setValue(0);

    this.comeUpTextBottomMenu = new Animated.Value(-10);
    this.fadeInTextBottomMenu = new Animated.Value(0);

    Animated.parallel([
      // Move tab indicator
      Animated.timing(this.moveTabIndicator, {
        toValue: posXIconMenu - 21,
        duration: 500 * this.timeDilation,
        delay: 200,
      }),
      Animated.timing(this.zoomTabIndicator, {
        toValue: 1,
        duration: 700 * this.timeDilation,
        delay: 200,
      }),
      Animated.timing(this.tweenColorTabIndicator, {
        toValue: 1,
        duration: 450 * this.timeDilation,
        delay: 350,
      }),

      // Come up plates
      Animated.timing(this.comeUpPlate1, {
        toValue: 0,
        duration: 600 * this.timeDilation,
        delay: 200,
      }),
      Animated.timing(this.comeUpPlate2, {
        toValue: 0,
        duration: 800 * this.timeDilation,
        delay: 300,
      }),
      Animated.timing(this.comeUpPlate3, {
        toValue: 0,
        duration: 800 * this.timeDilation,
        delay: 700
      }),

      // Come up icons bottom menu
      Animated.timing(this.comeUpIconBottomMenu1, {
        toValue: 1,
        duration: 800 * this.timeDilation,
        delay: 300,
      }),
      Animated.timing(this.comeUpIconBottomMenu2, {
        toValue: 1,
        duration: 800 * this.timeDilation,
        delay: 400,
      }),
      Animated.timing(this.comeUpIconBottomMenu3, {
        toValue: 1,
        duration: 800 * this.timeDilation,
        delay: 500,
      }),
      Animated.timing(this.comeUpIconBottomMenu4, {
        toValue: 1,
        duration: 800 * this.timeDilation,
        delay: 600,
      }),
      Animated.timing(this.comeUpIconBottomMenu5, {
        toValue: 1,
        duration: 800 * this.timeDilation,
        delay: 700,
      }),

      // Come up text bottom menu
      Animated.timing(this.comeUpTextBottomMenu, {
        toValue: 30,
        duration: 400 * this.timeDilation,
        delay: 300
      }),
      Animated.timing(this.fadeInTextBottomMenu, {
        toValue: 1,
        duration: 400 * this.timeDilation,
        delay: 300
      }),

    ]).start();
    this.setState({
      shouldShowIndicator: true,
    });
  }

  componentDidMount() {
    let posXIconSeat;
    let posXIconMenu;
    let widthScreen = Dimensions.get('window').width;

    switch (widthScreen) {
      case 180:
        // HD
        posXIconSeat = 247 / 2;
        posXIconMenu = 147 / 2;
        this.doFirstAnimation(posXIconSeat, posXIconMenu);
        break;
      case 360:
        // Full HD
        posXIconSeat = 247;
        posXIconMenu = 147;
        this.doFirstAnimation(posXIconSeat, posXIconMenu);
        break;
      case 720:
        // QHD
        posXIconSeat = 247 * 2;
        posXIconMenu = 147 * 2;
        this.doFirstAnimation(posXIconSeat, posXIconMenu);
        break;
      default:
        // Measure
        // Have to delay because sometimes componentDidMount be called but system not render UI success
        // Function measure is asynchronous
        setTimeout(() => {
          this.posIconSeat.measure((fx, fy, width, height, px, py) => {
            posXIconSeat = px;

            this.posIconMenu.measure((fx, fy, width, height, px, py) => {
              posXIconMenu = px;
              this.doFirstAnimation(posXIconSeat, posXIconMenu);
            });
          });
        }, 200);
        break;
    }
  }

  onPlatePress = whichPlate => {
    this.setState({
      whichPlate: whichPlate,
    });

    this.fadeInWhitePlate.setValue(0);
    this.zoomPlate.setValue(0);
    Animated.parallel([
      Animated.timing(this.fadeInWhitePlate, {
        toValue: 1,
        duration: 800 * this.timeDilation,
      }),
      Animated.timing(this.zoomPlate, {
        toValue: 1,
        duration: 800 * this.timeDilation,
      })
    ]).start(this.onAnimationPlateSuccess)
  };

  onAnimationPlateSuccess = () => {
    this.setState({
      isBtnPlatePress: true,
    });
  };

  onAnimationCancelCompleted = () => {
    this.setState({
      whichPlate: 0,
      isBtnPlatePress: false,
      countQuantity: 0,
    });
  };

  onIconAddPress = () => {
    this.setState({
      countQuantity: this.state.countQuantity + 1,
    });
    this.zoomPlate.setValue(0);
    Animated.timing(this.zoomPlate, {
      toValue: 1,
      duration: 800 * this.timeDilation,
    }).start();
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPress)
  }

  handleBackPress() {
    this.props.navigation.goBack();
    return true
  }

  onIconCancelPress = () => {
    this.fadeInWhitePlate.setValue(1);
    this.zoomPlate.setValue(1);

    Animated.parallel([
      Animated.timing(this.fadeInWhitePlate, {
        toValue: 0,
        duration: 800 * this.timeDilation,
      }),
      Animated.timing(this.zoomPlate, {
        toValue: 0,
        duration: 800 * this.timeDilation,
      })
    ]).start(this.onAnimationCancelCompleted);
  };

  render() {

    let scaleZoomTabIndicator = this.zoomTabIndicator.interpolate({
      inputRange: [0, 0.3, 0.7, 0.85, 0.93, 1.0],
      outputRange: [1.0, 1.5, 1.5, 1.0, 1.2, 1.0],
    });
    let shiftColorTabIndicator = this.tweenColorTabIndicator.interpolate({
      inputRange: [0, 1],
      outputRange: ['#ffffff', '#f53970'],
    });

    let scaleZoomPlate = this.zoomPlate.interpolate({
      inputRange: [0, 0.2, 0.8, 1],
      outputRange: [1.0, 0.9, 1.1, 1.0],
    });

    let bounceUpIconBottomMenu1 = this.comeUpIconBottomMenu1.interpolate({
      inputRange: [0, 0.7, 0.85, 1],
      outputRange: [-15, 75, 65, 70],
    });
    let bounceUpIconBottomMenu2 = this.comeUpIconBottomMenu2.interpolate({
      inputRange: [0, 0.7, 0.85, 1],
      outputRange: [-15, 75, 65, 70],
    });
    let bounceUpIconBottomMenu3 = this.comeUpIconBottomMenu3.interpolate({
      inputRange: [0, 0.7, 0.85, 1],
      outputRange: [-15, 75, 65, 70],
    });
    let bounceUpIconBottomMenu4 = this.comeUpIconBottomMenu4.interpolate({
      inputRange: [0, 0.7, 0.85, 1],
      outputRange: [-15, 75, 65, 70],
    });
    let bounceUpIconBottomMenu5 = this.comeUpIconBottomMenu5.interpolate({
      inputRange: [0, 0.7, 0.85, 1],
      outputRange: [-15, 75, 65, 70],
    });

    return (
      <View style={styles.viewContainer}>
        {/* Toolbar */}
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => this.handleBackPress()}>
            <Image style={styles.icBack} source={images.ic_back}/>
          </TouchableOpacity>
          <Text style={styles.titleToolbar}>RESTAURANT2</Text>
          <View style={styles.icBack}/>
        </View>

        {/* Tab indicator */}
        <View style={styles.tabIndicator}>
          {/*Indicator*/}
          {this.state.shouldShowIndicator ? <View style={styles.viewWrapIndicator}>
              <Animated.View
                style={[styles.viewIndicator, {
                  marginLeft: this.moveTabIndicator,
                  transform: [{scaleX: scaleZoomTabIndicator}],
                }]}/>
            </View>
            : null}

          <View style={styles.viewWrapItemTabIndicator}>
            <Image resizeMode="contain" style={styles.icTabIndicator} source={images.ic_home}/>
            <Text style={styles.textTabIndicator}>Dashboard</Text>
          </View>

          <View style={styles.viewWrapItemTabIndicator}>
            <Animated.Image resizeMode="contain"
                            style={[styles.icTabIndicator, {tintColor: shiftColorTabIndicator}]}
                            source={images.ic_menu}
                            ref={view => {
                              this.posIconMenu = view
                            }}/>
            <Text style={styles.textTabIndicator}>Menus</Text>
          </View>

          <View style={styles.viewWrapItemTabIndicator}>
            <Image resizeMode="contain"
                   style={[styles.icTabIndicator, {tintColor: this.state.shouldShowIndicator ? 'white' : '#f53970'}]}
                   source={images.ic_seat}
                   ref={view => (this.posIconSeat = view)}/>
            <Text style={styles.textTabIndicator}>Seats</Text>
          </View>
        </View>

        {/*Group plates*/}
        <View>
          {/*Plate row 1*/}
          <View style={styles.viewWrapPlateRow1}>
            {/*Plate 1*/}
            <View style={styles.viewWrapPlateAndName}>
              <Animated.View style={{
                marginTop: this.comeUpPlate1,
                transform: [{scale: this.state.whichPlate === 1 ? scaleZoomPlate : 1.0}]
              }}>
                <TouchableWithoutFeedback onPress={!this.state.isBtnPlatePress ? () => this.onPlatePress(1) : null}>

                  <View style={styles.viewWrapPlate}>
                    <Image style={styles.imgPlate} source={images.flan}/>

                    {/*Plate white*/}
                    <View style={styles.viewWrapPlateWhite}>
                      <Animated.View
                        style={{opacity: (this.state.whichPlate === 1) ? this.fadeInWhitePlate : 0}}>
                        <View style={{justifyContent: 'center'}}>
                          <Image style={styles.imgPlateWhite} source={images.ic_white_circle}/>

                          <View style={styles.viewWrapContentPlateWhite}>
                            <Image style={{width: 20, height: 20}} source={images.ic_remove_circle}/>
                            <Text style={styles.textCount}>{this.state.countQuantity}</Text>
                            <TouchableWithoutFeedback
                              onPress={this.state.isBtnPlatePress ? this.onIconAddPress : null}>
                              <Image style={{width: 20, height: 20}} source={images.ic_add_circle}/>
                            </TouchableWithoutFeedback>
                          </View>

                        </View>
                      </Animated.View>
                    </View>

                    {/*Price*/}
                    <View style={styles.viewWrapPrice}>
                      <Image style={styles.imgRedCircle} source={images.ic_red_circle}/>
                      <Text style={styles.textPrice}>$16</Text>
                    </View>
                  </View>

                </TouchableWithoutFeedback>
              </Animated.View>

              {/*Name food*/}
              <Text style={styles.textPlate}>Flan</Text>
            </View>

            {/*Plate 2*/}
            <View style={styles.viewWrapPlateAndName}>
              <Animated.View style={{
                marginTop: this.comeUpPlate1,
                transform: [{scale: this.state.whichPlate === 2 ? scaleZoomPlate : 1.0}]
              }}>
                <TouchableWithoutFeedback onPress={!this.state.isBtnPlatePress ? () => this.onPlatePress(2) : null}>

                  <View style={styles.viewWrapPlate}>
                    <Image style={styles.imgPlate} source={images.curry}/>

                    {/*Plate white*/}
                    <View style={styles.viewWrapPlateWhite}>
                      <Animated.View
                        style={{opacity: (this.state.whichPlate === 2) ? this.fadeInWhitePlate : 0}}>
                        <View style={{justifyContent: 'center'}}>
                          <Image style={styles.imgPlateWhite} source={images.ic_white_circle}/>

                          <View style={styles.viewWrapContentPlateWhite}>
                            <Image style={{width: 20, height: 20}} source={images.ic_remove_circle}/>
                            <Text style={styles.textCount}>{this.state.countQuantity}</Text>
                            <TouchableWithoutFeedback
                              onPress={this.state.isBtnPlatePress ? this.onIconAddPress : null}>
                              <Image style={{width: 20, height: 20}} source={images.ic_add_circle}/>
                            </TouchableWithoutFeedback>
                          </View>

                        </View>
                      </Animated.View>
                    </View>

                    {/*Price*/}
                    <View style={styles.viewWrapPrice}>
                      <Image style={styles.imgRedCircle} source={images.ic_red_circle}/>
                      <Text style={styles.textPrice}>$24</Text>
                    </View>
                  </View>

                </TouchableWithoutFeedback>
              </Animated.View>

              {/*Name food*/}
              <Text style={styles.textPlate}>Curry</Text>
            </View>
          </View>

          {/*Plate row 2*/}
          <View style={styles.viewWrapPlateRow2}>
            {/*Plate 3*/}
            <View style={styles.viewWrapPlateAndName}>
              <Animated.View style={{
                marginTop: this.comeUpPlate1,
                transform: [{scale: this.state.whichPlate === 3 ? scaleZoomPlate : 1.0}]
              }}>
                <TouchableWithoutFeedback onPress={!this.state.isBtnPlatePress ? () => this.onPlatePress(3) : null}>

                  <View style={styles.viewWrapPlate}>
                    <Image style={styles.imgPlate} source={images.salad}/>

                    {/*Plate white*/}
                    <View style={styles.viewWrapPlateWhite}>
                      <Animated.View
                        style={{opacity: (this.state.whichPlate === 3) ? this.fadeInWhitePlate : 0}}>
                        <View style={{justifyContent: 'center'}}>
                          <Image style={styles.imgPlateWhite} source={images.ic_white_circle}/>

                          <View style={styles.viewWrapContentPlateWhite}>
                            <Image style={{width: 20, height: 20}} source={images.ic_remove_circle}/>
                            <Text style={styles.textCount}>{this.state.countQuantity}</Text>
                            <TouchableWithoutFeedback
                              onPress={this.state.isBtnPlatePress ? this.onIconAddPress : null}>
                              <Image style={{width: 20, height: 20}} source={images.ic_add_circle}/>
                            </TouchableWithoutFeedback>
                          </View>

                        </View>
                      </Animated.View>
                    </View>

                    {/*Price*/}
                    <View style={styles.viewWrapPrice}>
                      <Image style={styles.imgRedCircle} source={images.ic_red_circle}/>
                      <Text style={styles.textPrice}>$12</Text>
                    </View>
                  </View>

                </TouchableWithoutFeedback>
              </Animated.View>

              {/*Name food*/}
              <Text style={styles.textPlate}>Salmon Salad</Text>
            </View>

            {/*Plate 4*/}
            <View style={styles.viewWrapPlateAndName}>
              <Animated.View style={{
                marginTop: this.comeUpPlate1,
                transform: [{scale: this.state.whichPlate === 4 ? scaleZoomPlate : 1.0}]
              }}>
                <TouchableWithoutFeedback onPress={!this.state.isBtnPlatePress ? () => this.onPlatePress(4) : null}>

                  <View style={styles.viewWrapPlate}>
                    <Image style={styles.imgPlate} source={images.pizza}/>

                    {/*Plate white*/}
                    <View style={styles.viewWrapPlateWhite}>
                      <Animated.View
                        style={{opacity: (this.state.whichPlate === 4) ? this.fadeInWhitePlate : 0}}>
                        <View style={{justifyContent: 'center'}}>
                          <Image style={styles.imgPlateWhite} source={images.ic_white_circle}/>

                          <View style={styles.viewWrapContentPlateWhite}>
                            <Image style={{width: 20, height: 20}} source={images.ic_remove_circle}/>
                            <Text style={styles.textCount}>{this.state.countQuantity}</Text>
                            <TouchableWithoutFeedback
                              onPress={this.state.isBtnPlatePress ? this.onIconAddPress : null}>
                              <Image style={{width: 20, height: 20}} source={images.ic_add_circle}/>
                            </TouchableWithoutFeedback>
                          </View>

                        </View>
                      </Animated.View>
                    </View>

                    {/*Price*/}
                    <View style={styles.viewWrapPrice}>
                      <Image style={styles.imgRedCircle} source={images.ic_red_circle}/>
                      <Text style={styles.textPrice}>$13</Text>
                    </View>
                  </View>

                </TouchableWithoutFeedback>
              </Animated.View>

              {/*Name food*/}
              <Text style={styles.textPlate}>Pizza</Text>
            </View>
          </View>

          {/*Plate row 3*/}
          <View style={styles.viewWrapPlateRow3}>
            {/*Plate 5*/}
            <Animated.View style={{marginTop: this.comeUpPlate3}}>
              <View style={styles.viewWrapPlate}>
                <Image style={styles.imgPlate} source={images.chicken}/>
                <Text style={styles.textPlate}>Chicken</Text>
                {/*Price*/}
                <View style={styles.viewWrapPrice}>
                  <Image style={styles.imgRedCircle} source={images.ic_red_circle}/>
                  <Text style={styles.textPrice}>$20</Text>
                </View>
              </View>
            </Animated.View>

            {/*Plate 6*/}
            <Animated.View style={{marginTop: this.comeUpPlate3}}>
              <View style={styles.viewWrapPlate}>
                <Image style={styles.imgPlate} source={images.duck}/>
                <Text style={styles.textPlate}>Duck</Text>
                <View style={styles.viewWrapPrice}>
                  <Image style={styles.imgRedCircle} source={images.ic_red_circle}/>
                  <Text style={styles.textPrice}>$11</Text>
                </View>
              </View>
            </Animated.View>
          </View>
        </View>

        {/*Cover white bottom*/}
        <View style={styles.imgCoverWhiteBottom}>
          <Image style={{width: '100%', height: '100%'}} source={images.shadow_white}/>
        </View>

        {/*Bottom menu*/}
        <View style={styles.viewWrapBottomMenu}>
          {/*Icons*/}
          <View style={styles.viewWrapIconsBottomMenu}>

            <Animated.View style={{marginBottom: bounceUpIconBottomMenu1}}>
              <Image style={styles.imgIconBottomMenu} source={images.ic_restaurant}/>
            </Animated.View>

            <Animated.View style={{marginBottom: bounceUpIconBottomMenu2}}>
              <Image style={styles.imgIconBottomMenu} source={images.ic_cake}/>
            </Animated.View>

            <Animated.View style={{marginBottom: bounceUpIconBottomMenu3}}>
              <Image style={styles.imgIconBottomMenu} source={images.ic_car}/>
            </Animated.View>

            <Animated.View style={{marginBottom: bounceUpIconBottomMenu4}}>
              <Image style={styles.imgIconBottomMenu} source={images.ic_coffee}/>
            </Animated.View>

            <Animated.View style={{marginBottom: bounceUpIconBottomMenu5}}>
              <TouchableOpacity onPress={this.onIconCancelPress}>
                <Image style={styles.imgIconBottomMenu} source={images.ic_cancel}/>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/*Text*/}
          <View style={styles.viewWrapTextBottomMenu1}>
            <Animated.View style={{marginBottom: this.comeUpTextBottomMenu, opacity: this.fadeInTextBottomMenu}}>
              <View style={styles.viewWrapTextBottomMenu2}>
                <View style={styles.viewWrapTextBottomMenu3}>
                  <Text style={styles.textBottomMenu}>Appetizer</Text>
                </View>
                <View style={styles.viewWrapTextBottomMenu3}>
                  <Text style={styles.textBottomMenu}>Salad</Text>
                </View>
                <View style={styles.viewWrapTextBottomMenu3}>
                  <Text style={styles.textBottomMenu}>Soup</Text>
                </View>
                <View style={styles.viewWrapTextBottomMenu3}>
                  <Text style={styles.textBottomMenu}>Meat</Text>
                </View>
                <View style={styles.viewWrapTextBottomMenu3}>
                  <Text style={styles.textBottomMenu}>Cancel</Text>
                </View>
              </View>
            </Animated.View>
          </View>

        </View>

      </View>
    )
  }
}
