// function loadToolBox() {
var toolBox = `

  <category name="Variables" colour="%{BKY_VARIABLES_HUE}">
    <block type="graph_get_x"></block>
    <block type="graph_set_y"></block>
    <block type="variables_set"></block>
    <block type="internal_variables_set"></block>

    <block type="variables_get"></block>

    <block type="math_change"></block>
  </category>

  <category name="Loops" colour="%{BKY_LOOPS_HUE}">
    <block type="controls_repeat_ext">
      <value name="TIMES">
        <block type="math_number">
          <field name="NUM">10</field>
        </block>
      </value>
    </block>
    <block type="controls_whileUntil"></block>
    <block type="controls_for">
      <field name="VAR">i</field>
      <value name="FROM">
        <block type="math_number">
          <field name="NUM">1</field>
        </block>
      </value>
      <value name="TO">
        <block type="math_number">
          <field name="NUM">10</field>
        </block>
      </value>
      <value name="BY">
        <block type="math_number">
          <field name="NUM">1</field>
        </block>
      </value>
    </block>
    <block type="controls_forEach"></block>
    <block type="controls_flow_statements"></block>
  </category>

  <category name="Logic" colour="%{BKY_LOGIC_HUE}">
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
    <block type="logic_negate"></block>
    <block type="logic_boolean"></block>
    <block type="logic_ternary"></block>
    <block type="controls_if"></block>
    <block type="logic_compare">
      <field name="OP">EQ</field>
    </block>
    <block type="logic_operation">
      <field name="OP">AND</field>
    </block>
    <block type="logic_negate"></block>
    <block type="logic_boolean">
      <field name="BOOL">TRUE</field>
    </block>
    <block type="logic_null"></block>
    <block type="logic_ternary"></block>
  </category>

  <category name="Math" colour="%{BKY_MATH_HUE}">
    <block type="math_number">
      <field name="NUM">123</field>
    </block>
    <block type="math_arithmetic">
      <value name="A">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="B">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>

    <block type="math_arithmetic_3vars">
    <value name="A">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="B">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="C">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
  </block>

  <block type="math_arithmetic_3vars_parentheses">
  <value name="A">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
  <value name="B">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
  <value name="C">
  <shadow type="math_number">
    <field name="NUM">1</field>
  </shadow>
</value>
</block>
    
    <block type="math_single">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">9</field>
        </shadow>
      </value>
    </block>
    <!-- 增加log数学计算 -->
    <block type="math_custom_log">
      <value name="BASE">
        <shadow type="math_number">
          <field name="NUM">2</field>
        </shadow>

      </value>
      <value name="VALUE2">
        <shadow type="math_number">
          <field name="NUM">64</field>
        </shadow>
      </value>
    </block>

    <block type="math_trig">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">45</field>
        </shadow>
      </value>
    </block>
    <block type="math_constant"></block>
    <block type="math_on_list"></block>
    <block type="math_number_property">
      <value name="NUMBER_TO_CHECK">
        <shadow type="math_number">
          <field name="NUM">0</field>
        </shadow>
      </value>
    </block>
    <block type="math_round">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">3.1</field>
        </shadow>
      </value>
    </block>
    <block type="math_modulo">
      <value name="DIVIDEND">
        <shadow type="math_number">
          <field name="NUM">64</field>
        </shadow>
      </value>
      <value name="DIVISOR">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    <block type="math_constrain">
      <value name="VALUE">
        <shadow type="math_number">
          <field name="NUM">50</field>
        </shadow>
      </value>
      <value name="LOW">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="HIGH">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>
    <block type="math_random_int">
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>
    <!-- 增加random生成正态分布 -->
    <block type="math_normal_distribution">
      <value name="MEAN">
        <shadow type="math_number">
          <field name="NUM">0</field>
        </shadow>
      </value>
      <value name="STD_DEV">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
    <block type="math_random_float"></block>
    <block type="math_atan2">
      <value name="X">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="Y">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
  </category>
  <category name="Functions" colour="#995ba5" custom="PROCEDURE"></category>
  <category name="Text" colour="#5ba58c">
    <block type="text">
      <field name="TEXT"></field>
    </block>
    <block type="text_join">
      <mutation items="2"></mutation>
    </block>
    <block type="text_append">
      <field name="VAR" id="bJdb!WopF]/.X@@SV{F1">item</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT"></field>
        </shadow>
      </value>
    </block>
    <block type="text_length">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_isEmpty">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT"></field>
        </shadow>
      </value>
    </block>
    <block type="text_indexOf">
      <field name="END">FIRST</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="^8}pRP4?X4K#!A]i;Ju%">text</field>
        </block>
      </value>
      <value name="FIND">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_charAt">
      <mutation at="true"></mutation>
      <field name="WHERE">FROM_START</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="^8}pRP4?X4K#!A]i;Ju%">text</field>
        </block>
      </value>
    </block>
    <block type="text_getSubstring">
      <mutation at1="true" at2="true"></mutation>
      <field name="WHERE1">FROM_START</field>
      <field name="WHERE2">FROM_START</field>
      <value name="STRING">
        <block type="variables_get">
          <field name="VAR" id="^8}pRP4?X4K#!A]i;Ju%">text</field>
        </block>
      </value>
    </block>
    <block type="text_changeCase">
      <field name="CASE">UPPERCASE</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_trim">
      <field name="MODE">BOTH</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_print">
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_prompt_ext">
      <mutation type="TEXT"></mutation>
      <field name="TYPE">TEXT</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
  </category>
  <category name="LIST" colour="%{BKY_LISTS_HUE}">
    <block type="lists_create_with">
      <mutation items="0"></mutation>
    </block>
    <block type="lists_create_with"></block>
    <block type="lists_repeat">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">5</field>
        </shadow>
      </value>
    </block>
    <block type="lists_length"></block>
    <block type="lists_isEmpty"></block>
    <block type="lists_indexOf">
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR">{listVariable}</field>
        </block>
      </value>
    </block>
    <block type="lists_getIndex">
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR">{listVariable}</field>
        </block>
      </value>
    </block>
    <block type="lists_setIndex">
      <value name="LIST">
        <block type="variables_get">
          <field name="VAR">{listVariable}</field>
        </block>
      </value>
    </block>
    <block type="lists_getSublist">
      <value name="LIST">
        <block type="variables_get">
          <field name="VAR">{listVariable}</field>
        </block>
      </value>
    </block>
    <block type="lists_split">
      <value name="DELIM">
        <shadow type="text">
          <field name="TEXT">,</field>
        </shadow>
      </value>
    </block>
    <block type="lists_sort"></block>
    <block type="list_delete_value">

    </block>
    <block type="list_get_random_value"></block>
    <block type="list_remove_and_random"></block>
  </category>

  <category name="Colour" colour="#a5745b">
    <block type="colour_picker">
      <field name="COLOUR">#ff0000</field>
    </block>
    <block type="colour_random"></block>
    <block type="colour_rgb">
      <value name="RED">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
      <value name="GREEN">
        <shadow type="math_number">
          <field name="NUM">50</field>
        </shadow>
      </value>
      <value name="BLUE">
        <shadow type="math_number">
          <field name="NUM">0</field>
        </shadow>
      </value>
    </block>
    <block type="colour_blend">
      <value name="COLOUR1">
        <shadow type="colour_picker">
          <field name="COLOUR">#ff0000</field>
        </shadow>
      </value>
      <value name="COLOUR2">
        <shadow type="colour_picker">
          <field name="COLOUR">#3333ff</field>
        </shadow>
      </value>
      <value name="RATIO">
        <shadow type="math_number">
          <field name="NUM">0.5</field>
        </shadow>
      </value>
    </block>
  </category>

  <category name="Map" colour="#9fa55b">
    <block type="create_map"></block>
    <block type="map_add">
      <field name="map_name">map</field>
    </block>
    <block type="map_change">
      <field name="map_name">map</field>
    </block>
    <block type="map_get">
      <field name="map_name">map</field>
    </block>
    <block type="sort_map"></block>
  </category>

  <category name="Config" colour="#5ba58c">
    <block type="person_block">
      <field name="person_block_n">default</field>
      <field name="person_block_c">0</field>
      <field name="Asymptomatic_rate">0.5</field>
      <field name="Fatality_rate">0.1</field>
      <field name="Incubation_period">14</field>
      <field name="duration">28</field>
      <field name="person_block_d">uniform</field>
    </block>
  </category>

  <category name="Action" colour="#9fa55b">
    <block type="action_moveto">
      <field name="moveto_d">1000</field>
    </block>
    <block type="action_timeout">
      <field name="action_timeout_d">500</field>
    </block>
    <block type="action_inject">
      <field name="rate">1</field>
    </block>
    <block type="value_random_position">
      <field name="random_type">uniform</field>
    </block>
    <block type="value_around_position">
      <field name="shifting">20</field>
    </block>
    <block type="value_fixed_position">
      <field name="X">50</field>
      <field name="Y">50</field>
    </block>
  </category>

  <category name="State" colour="#a55b80">
    <block type="value_is_symptomatic"></block>
    <block type="value_is_pcr">
      <field name="fack_n">0</field>
      <field name="fack_e">0</field>
    </block>
  </category>

  <category name="Visualization" colour="%{BKY_LOGIC_HUE}">
    <block type="draw_line"></block>

  </category>

  <category name="遗传" colour="#5ba55b">
    <block type="define_gene_structure"></block>
    <block type="define_functions"></block>
    <block type="selection"></block>
    <block type="initializing_population"></block>
    <block type="totenandcalfitvalue"></block>
    <block type="mutation"></block>
    <block type="bestgene"></block>
  </category>
  <category name="Strategy" colour="#a5745b">
    <block type="value_cooperation"></block>
    <block type="value_defection"></block>
    <block type="value_index"></block>
    <block type="value_another_i"></block>
    <block type="value_self_i"></block>
    <block type="value_another_list"></block>
    <block type="value_self_list"></block>
    <block type="stratege_block">
      <field name="name">default</field>
    </block>
    <block type="return_block"></block>
  </category>

  <category name="hanoi" colour="#5b67a5">
    <block type="move"></block>
    <block type="set_pillar"></block>
  </category>

  
  <category name="koch" colour="#5b23a5">
    <block type="draw_custom_shape"></block>
    <block type="create_point"></block>
    <block type="get_coordinate"></block>
  </category>

`;

document.getElementById('toolbox').innerHTML = toolBox;
// }

